import { Typography } from '@mui/material';

export interface RecordsDisplayProps {
  start: number;
  end: number;
  rows: number;
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
