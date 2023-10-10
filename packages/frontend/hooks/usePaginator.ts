import { useState, useEffect } from 'react'

import type { IdRecord, Stream } from '@calyptia-vivo/lib/types'


function computeLastPage(allRecords: IdRecord[], pageSize: number) {
  const pageCount = Math.ceil(allRecords.length / pageSize);
  return pageCount === 0 ? 0 : pageCount - 1;
}

function computePageRecords(allRecords: IdRecord[], pageSize: number, page: number) {
  const startIndex = page * pageSize;
  const endIndex = (() => {
    const endIndex = startIndex + pageSize;
    if (endIndex > allRecords.length) {
      return allRecords.length;
    }
    return endIndex;
  })();

  return [allRecords.slice(startIndex, endIndex), startIndex] as [IdRecord[], number];
}

export default function usePaginator(stream: Stream) {
  const [state, setState] = useState({
    page: 0,
    pageSize: 10,
    paginatedStream: {
      records: [],
      kind: stream.kind
    } as Stream,
    startIndex: 0,
    totalRecords: stream.records.length
  });

  useEffect(() => {
    setState(s => ({
      ...s,
      page: 0
    }));
  }, [stream.kind])

  useEffect(() => {
    setState(s => {
      const [records, startIndex] = computePageRecords(stream.records, s.pageSize, s.page);
      return {
        ...s,
        paginatedStream: {
          records,
          kind: stream.kind
        } as Stream,
        startIndex,
        totalRecords: stream.records.length
      }
    });
  }, [stream, state.page, state.pageSize]);

  function setPage(val: number) {
    setState(s => {
      const lastPage = computeLastPage(stream.records, s.pageSize);
      let page = val
      if (page > lastPage) {
        page = lastPage;
      } else if (page < 0) {
        page = 0;
      }
      return {
        ...s,
        page: Math.round(page)
      }
    });
  }

  function setPageSize(val: number) {
    setState(s => {
      let pageSize = val;
      if (pageSize > stream.records.length) {
        pageSize = stream.records.length
      } else if (pageSize < 5) {
        pageSize = 5
      }
      return {
        ...s,
        pageSize: Math.round(pageSize)
      }
    });
  }


  return {
    ...state,
    setPage,
    setPageSize,
  }
}
