import { useState, useEffect } from 'react'
import type { StreamKind, Stream } from '@calyptia-vivo/lib/types'

type Opts = {
  vivoExporterUrl: string
  limit: number
  pollInterval: number
  kind: StreamKind
}

async function fetchStream(vivoExporterUrl: string, kind: StreamKind, lastId: number, clearedAt: number, limit: number): Promise<Stream> {
  const startFrom = lastId - limit - 10
  const from = clearedAt > startFrom ? clearedAt : startFrom;

  const response = await fetch(`${vivoExporterUrl}/${kind}?from=${Math.max(from, 0)}`);
  const endId = (() => {
    try {
      return parseInt(response.headers.get('vivo-stream-end-id') ?? '0');
    } catch (err) {
      return 0;
    }
  })();
  let id = endId;
  const lines = (await response.text()).split('\n');
  const records = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    if (records.length === limit) {
      break;
    }
    const line = lines[i].trim();
    if (line === '') {
      continue;
    }
    const record = JSON.parse(line)
    if (Array.isArray(record)) {
      records.push({ record, rawEvent: JSON.stringify(record[1]), rawMetadata: JSON.stringify(record[0][1]), id: id-- });
    } else {
      records.push({ record, rawEvent: JSON.stringify(record), rawMetadata: '', id: id-- });
    }
  }
  return {
    records,
    kind
  }
}

export default function useFluentBitStream({ vivoExporterUrl, pollInterval, limit, kind }: Opts) {
  const [ state, setState ] = useState({
    kind,
    stream: {
      records: [],
      kind
    } as Stream,
    initialFetch: true,
    clearedAt: 0
  })
  const [ active, setActive ] = useState(true);

  useEffect(() => {
    setState(s => ({
      ...s,
      kind,
      clearedAt: 0,  // when switching kind, remove the clearedAt
      initialFetch: true
    }));
  }, [kind])

  useEffect(() => {
    if (!active || !pollInterval) {
      return;
    }
    let timer: ReturnType<typeof setTimeout> | null = null;

    const fetcher = () => {
      timer = null;
      const lastId = state.stream.records[0]?.id ?? 0
      fetchStream(vivoExporterUrl, kind, lastId, state.clearedAt, limit).then(stream => {
        setState(s => {
          if (s.kind === kind) {
            return {
              ...s,
              stream,
              initialFetch: false
            }
          }
          return s;
        });
      });
    }

    if (state.initialFetch) {
      fetcher();
    } else {
      timer = setTimeout(fetcher, pollInterval);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    }
  }, [active, kind, limit, pollInterval, vivoExporterUrl, state.stream, state.initialFetch, state.clearedAt]);

  return {
    stream: state.stream,
    active,
    clear: () => {
      setState(s => ({
        ...s,
        clearedAt: s.stream.records[0].id + 1,
        initialFetch: true  // when clearing, fetch immediately
      }));
    },
    setActive: setActive
  }
}
