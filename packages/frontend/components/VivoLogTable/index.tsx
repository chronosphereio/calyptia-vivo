import { Header, LogEvent } from '@calyptia-vivo/components/VivoLogTable/elements';
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
        const key = row.id.toString();
        const timestamp = Math.floor(row.record[0][0] / 1e6);
        const meta = JSON.stringify(row.record[0][1])
        const event = JSON.stringify(row.record[1])
        return <LogEvent key={key} timestamp={timestamp} meta={meta} event={event} kind={kind} />
      }): ''}
      {metricsTracesStream ? metricsTracesStream.records.map((row) => {
        const key = row.id.toString();
        return <LogEvent key={key} timestamp={0} event={JSON.stringify(row.record)} kind={kind} />
      }) : ''}
      </List>
    </Box>
  );
};

export default VivoLogTable;
