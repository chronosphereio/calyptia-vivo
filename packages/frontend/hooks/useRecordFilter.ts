import { useState } from 'react'

import type { Stream } from '@calyptia-vivo/lib/types'

export default function useRecordFilter(stream: Stream) {
  const allRecords = stream.records;
  const [metadataFilter, setMetadataFilter] = useState('');
  const [eventFilter, setEventFilter] = useState('');

  const eventFilterLower = eventFilter.toLowerCase()
  const metadataFilterLower = metadataFilter.toLowerCase()

  return {
    filteredStream: {
      ...stream,
      records: allRecords.filter(data => {
        if (eventFilterLower) {
          if (!data.rawEvent.toLowerCase().includes(eventFilterLower)) {
            return false;
          }
        }

        if (metadataFilterLower && stream.kind === 'logs') {
          if (!data.rawMetadata.toLowerCase().includes(metadataFilterLower)) {
            return false;
          }
        }

        return true;
      })
    } as Stream,
    setEventFilter,
    setMetadataFilter
  }
}
