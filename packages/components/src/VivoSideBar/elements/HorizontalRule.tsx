import { HORIZONTAL_RULE_STYLE } from '../constants';
import { Box, Stack } from '@mui/material';

const HorizontalRule = () => {
  return (
    <Stack direction="column" sx={HORIZONTAL_RULE_STYLE} className={'menu-stack horizontal-rule'}>
      <Box />
    </Stack>
  );
};

export { HorizontalRule };
