import { useState, useEffect } from 'react'

import type { IdRecord, StreamKind } from './useFluentBitStream';


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

export default function usePaginator(allRecords: IdRecord[], streamKind: StreamKind) {
  const [state, setState] = useState({
    page: 0,
    pageSize: 10,
    records: [] as IdRecord[],
    startIndex: 0,
    totalRecords: allRecords.length
  });

  useEffect(() => {
    setState(s => ({
      ...s,
      page: 0
    }));
  }, [streamKind])

  useEffect(() => {
    setState(s => {
      const [records, startIndex] = computePageRecords(allRecords, s.pageSize, s.page);
      return {
        ...s,
        records,
        startIndex,
        totalRecords: allRecords.length
      }
    });
  }, [allRecords, state.page, state.pageSize]);

  function setPage(val: number) {
    setState(s => {
      const lastPage = computeLastPage(allRecords, s.pageSize);
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
      if (pageSize > allRecords.length) {
        pageSize = allRecords.length
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
