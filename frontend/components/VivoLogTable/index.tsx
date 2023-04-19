import { Header, LogEvent } from './elements';
import { Box } from '@mui/material';

import { PAPER_STYLE } from './constants'

type FluentBitData = {
  id: number;
  record: Array<any>;
}

export interface VivoLogTableProps {
  rows: FluentBitData[];
  kind: string
}

type ContentSwitcher = { [key: string]: string[]; }

const VivoLogTable = ({ rows, kind }: VivoLogTableProps) => {
  const columns : ContentSwitcher = {
    'logs': ['Time', 'Metadata', 'Event'],
    'metrics': ['Metric'],
    'traces': ['Trace']
  }

  return (
    <Box sx={PAPER_STYLE} >
      <Header headings={columns[kind]} />
      {rows && rows.map((row) => {
        const key = row.id.toString();
        const timestamp = Math.floor(row.record[0][0] / 1e6);
        const meta = kind === 'logs' ? JSON.stringify(row.record[0][1]) : undefined
        const event = kind === 'logs' ? JSON.stringify(row.record[1]) : JSON.stringify(row.record)
        return <LogEvent key={key} timestamp={timestamp} meta={meta} event={event} kind={kind} />
      })}
    </Box>
  );
};

export default VivoLogTable;
