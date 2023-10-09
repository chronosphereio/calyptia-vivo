import { CodeBoxCM } from '@calyptia-vivo/components/VivoLogTable/elements';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import type { LogEvent, MetricTraceEvent } from '@calyptia-vivo/lib/types';

import { LOG_DETAIL_PANEL, LOG_EVENT_BOX_STYLE, LOG_EVENT_ROW_STYLE } from '@calyptia-vivo/components/VivoLogTable/constants';

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const formatTime = date.toLocaleString('en-US', { second: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
  const formatDate = date.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })
  return `${formatDate} | ${formatTime}`
}

function beautify(json: string) {
  return JSON.stringify(JSON.parse(json), null, 2);
}

interface LogEventProps extends LogEvent {
  truncate?: number
}

const LogEventItem = ({
  record,
  rawMetadata: meta,
  rawEvent: event,
  truncate = 72
}: LogEventProps) => {
  const timestamp = Math.floor(record[0][0] / 1e6);

  const [expandedView, setExpandedView] = useState<boolean | undefined>(false);
  const [expandedData, setExpandedData] = useState(['', ''] as [string, string]);

  useEffect(() => {
    if (!expandedData[0] && expandedView) {
      setExpandedData([
        beautify(meta),
        beautify(event),
      ]);
    }
  }, [expandedView, event, meta, expandedData]);

  const truncateValue = (value: string) => (value.length > truncate ? `${value.substring(0, truncate)}...` : value);
  return (
    <Box sx={LOG_EVENT_BOX_STYLE}>
      <Stack direction="row" sx={LOG_EVENT_ROW_STYLE}>
        <Typography className={`cell-0 ${expandedView ? 'expanded' : ''}`}>{formatTimestamp(timestamp || 0)}</Typography>
        <Typography className={`cell-1 cell ${expandedView ? 'hidden' : ''}`}>{truncateValue(meta)}</Typography>
        <Typography className={`cell-2 cell ${expandedView ? 'hidden' : ''}`}>{truncateValue(event)}</Typography>
        <Typography className={'chevron-label'}>{expandedView ? 'Close' : 'Open'}</Typography>
        <FirstPageIcon
          className={`chevron ${expandedView ? 'expanded' : ''}`}
          onClick={() => setExpandedView(!expandedView)}
        />
      </Stack>
      <Collapse in={expandedView}>

        <Stack direction="column" sx={LOG_DETAIL_PANEL}>
          <Typography>Metadata</Typography>
          <CodeBoxCM readOnly={true} value={expandedData[0]} height="152px" language="json" />
          <Typography>Event</Typography>
          <CodeBoxCM readOnly={true} value={expandedData[1]} height="266px" language="json" />
        </Stack>

      </Collapse>
    </Box>
  );
};


interface MetricTraceEventProps extends MetricTraceEvent {
  truncate?: number
}

const MetricTraceEventItem = ({
  rawEvent: event,
  truncate = 72
}: MetricTraceEventProps) => {

  const [expandedView, setExpandedView] = useState(false);
  const [expandedData, setExpandedData] = useState('');

  useEffect(() => {
    if (!expandedData && expandedView) {
      setExpandedData(beautify(event));
    }
  }, [expandedView, event, expandedData]);

  const truncateValue = (value: string) => (value.length > truncate ? `${value.substring(0, truncate)}...` : value);
  return (
    <Box sx={LOG_EVENT_BOX_STYLE}>
      <Stack direction="row" sx={LOG_EVENT_ROW_STYLE}>
        <Typography className={`cell-2 cell ${expandedView ? 'hidden' : ''}`}>{truncateValue(event)}</Typography>
        <Typography className={'chevron-label'}>{expandedView ? 'Close' : 'Open'}</Typography>
        <FirstPageIcon
          className={`chevron ${expandedView ? 'expanded' : ''}`}
          onClick={() => setExpandedView(!expandedView)}
        />
      </Stack>
      <Collapse in={expandedView}>
        <Stack direction="column" sx={LOG_DETAIL_PANEL}>
          <Typography>Event</Typography>
          <CodeBoxCM readOnly={true} value={expandedData} height="266px" language="json" />
        </Stack>

      </Collapse>
    </Box>
  );
};

export { LogEventItem, MetricTraceEventItem };
