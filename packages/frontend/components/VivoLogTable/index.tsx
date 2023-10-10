import { Header, LogEventItem, MetricTraceEventItem } from '@calyptia-vivo/components/VivoLogTable/elements';
import { Box } from '@mui/material';
import List from "@mui/material/List"
import { Stream } from '@calyptia-vivo/lib/types';

import { PAPER_STYLE } from './constants'

export interface VivoLogTableProps {
  stream: Stream;
}

type ContentSwitcher = { [key: string]: string[]; }

const VivoLogTable = ({ stream }: VivoLogTableProps) => {
  const columns : ContentSwitcher = {
    'logs': ['Time', 'Metadata', 'Event'],
    'metrics': ['Metric'],
    'traces': ['Trace']
  }
  const kind = stream.kind;
  const logStream = kind === 'logs' ? stream : null;
  const metricsTracesStream = kind !== 'logs' ? stream : null;

  return (
    <Box sx={PAPER_STYLE} >
      <Header headings={columns[stream.kind]} />
      <List sx={{ display: "flex", flexDirection: "column" }}>
      {logStream ? logStream.records.map((row) => {
        return <LogEventItem key={row.id} {...row} />
      }): ''}
      {metricsTracesStream ? metricsTracesStream.records.map((row) => {
        return <MetricTraceEventItem key={row.id} {...row} />
      }) : ''}
      </List>
    </Box>
  );
};

export default VivoLogTable;
