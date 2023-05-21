import { Typography } from '@mui/material';

export interface RecordsDisplayProps {
  start: string;
  end: string;
  rows: string;
}

const RecordsDisplay = ({ start, end, rows }: RecordsDisplayProps) => {
  let endRange = Number(start) + Number(rows) - 1;
  endRange = endRange >= Number(end) ? Number(end) : endRange;

  return (
    <Typography>
      {start} - {`${endRange}`} of {end}
    </Typography>
  );
};

export { RecordsDisplay };
