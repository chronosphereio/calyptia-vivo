import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import useFluentBitStream, { StreamKind } from '../hooks/useFluentBitStream';
import { VivoPage } from '@calyptia-vivo/components';

const Home: NextPage = () => {
  const [kind, setKind] = useState<StreamKind>('logs');
  const [pollInterval, setPollInterval] = useState<number>(5000);
  const [play, setPlay] = useState<boolean>(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [data, setData] = useState<any>(undefined);
  const [recordEnd, setRecordEnd] = useState<number|undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [startRecord, setStartRecord] = useState<number>(1);
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

  useEffect(() => {
    let selectedData = kind === 'logs' ? logs : kind === 'metrics' ? metrics : traces
    selectedData = selectedData.filter(data => {
      if (eventFilter) {
        if (!JSON.stringify((data.record as Array<string>)).toLowerCase().includes(eventFilter.toLowerCase())) {
          return false;
        }
      }

      if(metadataFilter && kind === 'logs') {
        if(!JSON.stringify((data.record as Array<Array<string>>)[0][1]).toLowerCase().includes(metadataFilter.toLowerCase())) {
          return false;
        }
      }

      return true;
    })
    setRecordEnd(selectedData.length)
    const start = page * rowsPerPage
    selectedData = selectedData.slice(start, (start+1)*Number(rowsPerPage))
    setStartRecord(start+1)
    setData(selectedData)
    setActiveType(kind)
  }, [kind, logs, metrics, traces, rowsPerPage, page, eventFilter, metadataFilter])

  const filterActionHandler = (target: string, field:string) => {
    field === 'metadata' ? setMetadataFilter(target) : setEventFilter(target)
    setPage(0)
  }

  return (
    <VivoPage 
      menuActionHandler={(target) => {
        setKind(target as StreamKind)
      }}
      learnHowActionHandler={() => (window.location.href = 'https://github.com/calyptia/vivo')}
      recordStart={startRecord.toString()}
      recordEnd={recordEnd?.toString()}
      recordsPerPage={rowsPerPage.toString()}
      pageChangeHandler={(value) => setPage(page + value)}
      rowsPerPageHandler={(value) => setRowsPerPage(value)}
      filterActionHandler={filterActionHandler}
      rateActionHandler={(value) => setPollInterval(value)}
      playActionHandler={(play) => setPlay(!play)}
      clearActionHandler={() => alert('clear')}
      play={play}
      tab={activeType}
      data={data}
      page={page}
    />
  )
}

export default Home

const VIVO_EXPORTER_URL = process.env.NEXT_VIVO_EXPORTER_URL ?? 'http://127.0.0.1:2025';