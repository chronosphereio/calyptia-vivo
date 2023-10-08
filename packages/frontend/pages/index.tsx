import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import useFluentBitStream, { StreamKind } from '../hooks/useFluentBitStream';
import usePaginator from '../hooks/usePaginator';
import { VivoPage } from '@calyptia-vivo/components';
import { VivoPaginator } from '@calyptia-vivo/components';

const Home: NextPage = () => {
  const [kind, setKind] = useState<StreamKind>('logs');
  const [pollInterval, setPollInterval] = useState<number>(5000);
  const [play, setPlay] = useState<boolean>(true);
  const [data, setData] = useState<any>(undefined);
  const [metadataFilter, setMetadataFilter] = useState<string | undefined>(undefined);
  const [eventFilter, setEventFilter] = useState<string | undefined>(undefined);
  const [activeType, setActiveType] = useState<string>('logs')

  const { records: logs, setActive: setLogsActive } = useFluentBitStream({
    vivoExporterUrl: VIVO_EXPORTER_URL,
    limit: 100,
    pollInterval: play ? pollInterval : 0,
    kind: 'logs'
  });

  const { records: metrics, setActive: setMetricsActive } = useFluentBitStream({
    vivoExporterUrl: VIVO_EXPORTER_URL,
    limit: 100,
    pollInterval: play ? pollInterval : 0,
    kind: 'metrics'
  });

  const { records: traces, setActive: setTracesActive } = useFluentBitStream({
    vivoExporterUrl: VIVO_EXPORTER_URL,
    limit: 100,
    pollInterval: play ? pollInterval : 0,
    kind: 'traces'
  });

  useEffect(() => {
    switch (kind) {
      case 'logs':
        setMetricsActive(false);
        setTracesActive(false);
        setLogsActive(true);
        break;
      case 'metrics':
        setLogsActive(false);
        setTracesActive(false);
        setMetricsActive(true);
        break;
      case 'traces':
        setLogsActive(false);
        setMetricsActive(false);
        setTracesActive(true);
        break;
    }
  }, [kind, setLogsActive, setMetricsActive, setTracesActive])

  const allRecords = kind === 'logs' ? logs : kind === 'metrics' ? metrics : traces
  const {
    records,
    page,
    pageSize,
    startIndex,
    totalRecords,
    setPageSize,
    setPage
  } = usePaginator(allRecords, kind);

  useEffect(() => {
    let selectedData = records
    const eventFilterLower = eventFilter?.toLowerCase()
    const metadataFilterLower = metadataFilter?.toLowerCase()
    selectedData = selectedData.filter(data => {
      if (eventFilterLower) {
        if (!data.rawEvent.toLowerCase().includes(eventFilterLower)) {
          return false;
        }
      }

      if (metadataFilterLower && kind === 'logs') {
        if (!data.rawMetadata.toLowerCase().includes(metadataFilterLower)) {
          return false;
        }
      }

      return true;
    })
    setData(selectedData)
    setActiveType(kind)
  }, [kind, records, eventFilter, metadataFilter])

  const filterActionHandler = (target: string, field: string) => {
    field === 'metadata' ? setMetadataFilter(target) : setEventFilter(target)
    setPage(0)
  }

  return (
    <>
      <VivoPage
        menuActionHandler={(target) => {
          setKind(target as StreamKind)
        }}
        learnHowActionHandler={() => (window.location.href = 'https://github.com/calyptia/vivo')}
        pageChangeHandler={(value) => setPage(value)}
        rowsPerPageHandler={(value) => setPageSize(value)}
        filterActionHandler={filterActionHandler}
        rateActionHandler={(value) => setPollInterval(value)}
        defaultRate={pollInterval}
        playActionHandler={(play) => setPlay(!play)}
        clearActionHandler={() => alert('clear')}
        play={play}
        tab={activeType}
        data={data}
        page={page}
      />
      <VivoPaginator
        recordStart={startIndex + 1}
        recordEnd={totalRecords}
        rowsPerPage={pageSize}
        pageChangeHandler={p => setPage(p)}
        page={page}
        rowsPerPageHandler={p => setPageSize(p)}
      />
    </>
  )
}

export default Home

const VIVO_EXPORTER_URL = (process.env.NEXT_PUBLIC_VIVO_EXPORTER_URL ?? process.env.NEXT_PUBLIC_VIVO_BASE_PATH ?? '').trim()
