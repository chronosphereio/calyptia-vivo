import HistoryIcon from '@mui/icons-material/History';
import { Box, MenuItem, TextField } from '@mui/material';

import { RATE_ICON, RATE_SELECT } from '@calyptia-vivo/components/VivoFilterBar/constants';

export interface SelectFilterProps {
  selectHandler: (value: number) => void;
  defaultRate: number;
}

const intervals = [
  { label: '0.1s', value: 100 },
  { label: '1s', value: 1000 },
  { label: '5s', value: 5000 },
  { label: '10s', value: 10000 },
  { label: '20s', value: 20000 },
]

const SelectFilter = ({ selectHandler, defaultRate }: SelectFilterProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <HistoryIcon sx={RATE_ICON} />
      <TextField
        id="select-rate"
        select
        label={null}
        defaultValue={defaultRate}
        onChange={(e) => selectHandler(Number(e.target.value))}
        sx={RATE_SELECT}
      >
        {intervals.map(i => (
          <MenuItem key={i.value} value={i.value}>
            {i.label}
          </MenuItem>))}
      </TextField>
    </Box>
  );
};

export { SelectFilter };
