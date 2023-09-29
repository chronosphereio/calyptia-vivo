import { VERTICAL_RULE_STYLE } from '@calyptia-vivo/components/VivoFilterBar/constants';
import { Stack } from '@mui/material';

const VerticalRule = () => {
  return <Stack direction="row" sx={VERTICAL_RULE_STYLE} spacing={1} />;
};

export { VerticalRule };
