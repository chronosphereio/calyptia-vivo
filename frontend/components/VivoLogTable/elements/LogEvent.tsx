import { CodeBoxCM } from '../../../components/CodeBoxCM';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import beautify_js from 'js-beautify'

import { LOG_DETAIL_PANEL, LOG_EVENT_BOX_STYLE, LOG_EVENT_ROW_STYLE } from '../constants';

export interface LogEventProps {
  timestamp?: number;
  meta?: string,
  event: string,
  truncate?: number;
  kind: string;
}

const formatTimestamp = (timestamp: number) => {
  const date = new Date(Math.floor(timestamp / 1000));
  const hours = date.getHours();
  const formatTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const formatDate = date.toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit'})
  return `${formatDate} | ${formatTime}`
}

const LogEvent = ({ timestamp, meta = '', event = '', truncate = 72, kind }: LogEventProps) => {

  const [expandedView, setExpandedView] = useState<boolean | undefined>(false);
  const truncateValue = (value: string) => (value.length > truncate ? `${value.substring(0, truncate)}...` : value);
  const formattedMeta = beautify_js(meta, { indent_size: 2 });
  const formattedEvent = beautify_js(event, { indent_size: 2 });
  return (
    <Box sx={LOG_EVENT_BOX_STYLE}>
      {kind === 'logs' ? 
        (
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
        )
        : 
        (
          <Stack direction="row" sx={LOG_EVENT_ROW_STYLE}>
            <Typography className={`cell-2 cell ${expandedView ? 'hidden' : ''}`}>{truncateValue(event)}</Typography>
            <Typography className={'chevron-label'}>{expandedView ? 'Close' : 'Open'}</Typography>
            <FirstPageIcon
                className={`chevron ${expandedView ? 'expanded' : ''}`}
                onClick={() => setExpandedView(!expandedView)}
              />
          </Stack>
        )
        }
      <Collapse in={expandedView}>

        {kind === 'logs' ?
          <Stack direction="column" sx={LOG_DETAIL_PANEL}>
            <Typography>Metadata</Typography>
            <CodeBoxCM value={formattedMeta} height="152px" language="json" />
            <Typography>Event</Typography>
            <CodeBoxCM value={formattedEvent} height="266px" language="json" />
          </Stack>
        :
          <Stack direction="column" sx={LOG_DETAIL_PANEL}>
            <Typography>Event</Typography>
            <CodeBoxCM value={formattedEvent} height="266px" language="json" />
          </Stack> 
        }

      </Collapse>
    </Box>
  );
};

export { LogEvent };
