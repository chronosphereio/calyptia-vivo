import { Button } from '@mui/material';
import type { ReactNode } from 'react';

export interface ButtonFilterProps {
  label: string;
  icon?: ReactNode;
  clickHandler: () => void;
}

const ButtonFilter = ({ label, icon, clickHandler }: ButtonFilterProps) => {
  return (
    <Button variant="outlined" onClick={clickHandler} startIcon={icon}>
      {label}
    </Button>
  );
};

export { ButtonFilter };
