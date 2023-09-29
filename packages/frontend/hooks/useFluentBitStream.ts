import { useState, useEffect } from 'react'

export type StreamKind = 'logs' | 'metrics' | 'traces'

type Opts = {
  vivoExporterUrl: string
  limit: number
  pollInterval: number
  kind: StreamKind
}

type IdRecord = {
  id: number
  record: unknown
  rawEvent: string
  rawMetadata: string
}

// limits records from the end
function limitRecords<T>(records: T[], max: number): T[] {
  const delta = records.length - max
  if (delta > 0) {
    return records.slice(0, records.length - delta)
  }
  return records
}

async function fetchStream(vivoExporterUrl: string, kind: StreamKind, lastId: number, limit: number) {
  const from = Math.max(lastId - limit - 100 , 0);
  const response = await fetch(`${vivoExporterUrl}/${kind}?from=${from}`);
  const startId = (() => {
    try {
      return parseInt(response.headers.get('vivo-stream-start-id') ?? '0');
    } catch (err) {
      return 0;
    }
  })();
  let id = startId;
  const records = (await response.text()).split('\n')
    .filter(line => line.trim() !== '')
    .map(l => {
      const record = JSON.parse(l)
      return { record, rawEvent: JSON.stringify(record[1]), rawMetadata: JSON.stringify(record[0][1]), id: id++ }
    });
  records.reverse();
  return records
}

export default function useFluentBitStream({ vivoExporterUrl, pollInterval, limit, kind }: Opts) {
  const [ records, setRecords ] = useState([] as IdRecord[])
  const [ active, setActive ] = useState(false);

  useEffect(() => {
    if (!active || !pollInterval) {
      return;
    }
    let timer: ReturnType<typeof setTimeout> | null = null;

    const fetcher = () => {
      timer = null;

      fetchStream(vivoExporterUrl, kind, records[0]?.id ?? 0, limit).then(records => {
        setRecords(limitRecords(records, limit));
      });
    }

    timer = setTimeout(fetcher, pollInterval);

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    }
  }, [active, kind, limit, pollInterval, vivoExporterUrl, records]);

  return {
    records,
    setActive: setActive
  }
}
