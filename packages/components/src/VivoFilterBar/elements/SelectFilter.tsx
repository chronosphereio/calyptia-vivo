import HistoryIcon from '@mui/icons-material/History';
import { Box, MenuItem, TextField } from '@mui/material';

import { RATE_ICON, RATE_SELECT } from '@calyptia-vivo/components/VivoFilterBar/constants';

export interface SelectFilterProps {
  selectHandler: (value: number) => void;
}

const SelectFilter = ({ selectHandler }: SelectFilterProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <HistoryIcon sx={RATE_ICON} />
      <TextField
        id="select-rate"
        select
        label={null}
        defaultValue={5000}
        onChange={(e) => selectHandler(Number(e.target.value))}
        sx={RATE_SELECT}
      >
        <MenuItem key={5000} value={5000}>
          5s
        </MenuItem>
        <MenuItem key={10000} value={10000}>
          10s
        </MenuItem>
        <MenuItem key={20000} value={20000}>
          20s
        </MenuItem>
      </TextField>
    </Box>
  );
};

export { SelectFilter };
