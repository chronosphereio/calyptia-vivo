import { Stack, Typography } from '@mui/material';

import { HEADER_STYLES } from '../constants';

export interface HeaderProps {
  headings: string[];
}

const Header = ({ headings = [] }: HeaderProps) => {
  return (
    <Stack sx={HEADER_STYLES} direction="row">
      {headings.map((heading, index) => (
        <Typography key={heading} className={`heading-${index}`}>{heading}</Typography>
      ))}
    </Stack>
  );
};

export { Header };
