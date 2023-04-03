import { useState, useEffect } from 'react'

export type StreamKind = 'logs' | 'metrics' | 'traces'

type Opts = {
  vivoExporterUrl: string
  limit: number
  pollInterval: number
}

// limits records from the end
function limitRecords(records: unknown[], max: number): unknown[] {
  const delta = records.length - max
  if (delta > 0) {
    return records.slice(delta)
  }
  return records
}

async function fetchStream(vivoExporterUrl: string, kind: StreamKind, lastId: number, limit: number) {
  const from = lastId - limit * 2;
  const response = await fetch(`${vivoExporterUrl}/${kind}?from=${from}`);
  const endId = (() => {
    try {
      return parseInt(response.headers.get('vivo-stream-end-id') ?? '0');
    } catch (err) {
      return 0;
    }
  })();
  const dataLines = (await response.text()).split('\n').filter(line => line.trim() !== '');
  return { records: dataLines.map(line => JSON.parse(line)), lastId: endId }
}

export default function useFluentBitStream({ vivoExporterUrl, pollInterval, limit }: Opts) {
  const [ chunks, setChunks ] = useState({
    logs: [] as unknown[],
    metrics: [] as unknown[],
    traces: [] as unknown[]
  });
  const [ kind, setKind ] = useState<StreamKind>('logs');

  useEffect(() => {
    let lastFetchId = 0;
    let id: ReturnType<typeof setTimeout> | null = null;

    const fetcher = () => {
      id = null;

      fetchStream(vivoExporterUrl, kind, lastFetchId, limit).then(({ records, lastId }) => {
        // use setTimeout vs setInterval to ensure there are no overlapping requests
        id = setTimeout(fetcher, pollInterval);
        lastFetchId = lastId;
        setChunks({
          ...chunks,
          [kind]: records
        });
      });
    }

    fetcher();

    return () => {
      if (id !== null) {
        clearTimeout(id);
      }
    }
  }, [kind]);

  return {
    records: limitRecords(chunks[kind], limit),
    kind: kind,
    setKind: setKind
  }
}
