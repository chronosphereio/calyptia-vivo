import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';

import { PAGINATOR_DISPLAY_STYLE } from '../constants';

export interface RecordsSelectorProps {
  rows: string;
  rowsPerPageHandler: (value: number) => void;
}

const RecordsSelector = ({ rows, rowsPerPageHandler }: RecordsSelectorProps) => {
  return (
    <Stack direction="row" className={'page-selector'}>
      <Typography sx={PAGINATOR_DISPLAY_STYLE}>Rows per page</Typography>
      <FormControl>
        <Select labelId="records-per-page" id="records-per-page" value={rows} onChange={(e) => rowsPerPageHandler(Number(e.target.value))} variant="standard">
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export { RecordsSelector };
