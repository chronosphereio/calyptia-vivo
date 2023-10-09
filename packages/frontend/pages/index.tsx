import type { NextPage } from 'next'
import { useState } from 'react'
import useFluentBitStream from '../hooks/useFluentBitStream';
import useRecordFilter from '../hooks/useRecordFilter';
import usePaginator from '../hooks/usePaginator';
import { StreamKind } from '@calyptia-vivo/lib/types';
import { VivoPage } from '@calyptia-vivo/components';
import { VivoPaginator } from '@calyptia-vivo/components';

const Home: NextPage = () => {
  const [kind, setKind] = useState<StreamKind>('logs');
  const [pollInterval, setPollInterval] = useState<number>(5000);

  const { stream, active, setActive } = useFluentBitStream({
    vivoExporterUrl: VIVO_EXPORTER_URL,
    limit: 100,
    pollInterval,
    kind
  });

  const {
    filteredStream,
    setEventFilter,
    setMetadataFilter
  } = useRecordFilter(stream);

  const {
    paginatedStream,
    page,
    pageSize,
    startIndex,
    totalRecords,
    setPageSize,
    setPage
  } = usePaginator(filteredStream);

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
        playActionHandler={(play) => setActive(!play)}
        clearActionHandler={() => {
        }}
        play={active}
        stream={paginatedStream}
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
