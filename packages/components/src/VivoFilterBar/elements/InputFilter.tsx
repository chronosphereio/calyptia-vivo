import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, TextField } from '@mui/material';

import { INPUT_STYLE, SEARCH_ICON } from '@calyptia-vivo/components/VivoFilterBar/constants';

export interface InputFilterProps {
  label: string;
  defaultValue?: string;
  changeHandler: (target: string) => void;
}

const InputFilter = ({ label, defaultValue = '', changeHandler }: InputFilterProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SearchOutlinedIcon sx={SEARCH_ICON} />
      <TextField
        sx={INPUT_STYLE}
        id="outlined-required"
        label={label}
        defaultValue={defaultValue}
        onChange={(e) => changeHandler(e.target.value)}
      />
    </Box>
  );
};

export { InputFilter };
