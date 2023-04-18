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
    'metrics': ['Time', 'Metadata', 'Event'],
    'traces': ['Event']
  }
  return (
    <Box sx={PAPER_STYLE} >
      <Header headings={columns[kind]} />
      {rows && rows.map((row) => (
        <LogEvent key={row.record[0][0]} timestamp={row.record[0][0]} meta={JSON.stringify(row.record[0][1])} event={JSON.stringify(row.record[1])} kind={kind} />
      ))}
    </Box>
  );
};

export default VivoLogTable;
