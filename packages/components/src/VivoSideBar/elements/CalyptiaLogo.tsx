import { destructureSrcFromLogo } from '@vivo/components/utils';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CALYPTIA_VIVO_ICON } from '@vivo/components/Icons';
import { CALYPTIA_LOGO_STYLES } from '../constants';

interface CalyptiaLogoProps {
  clickHandler: () => void;
}

const CalyptiaLogo = ({ clickHandler }: CalyptiaLogoProps) => {
  return (
    <Stack direction="column" sx={CALYPTIA_LOGO_STYLES} className={'calyptia-logo menu-stack'}>
      <Box className={'promo-box'}>
        <Typography className={'start'}>Let&apos;s start!</Typography>
        <Typography className={'display'}>Display live data</Typography>
        <Button variant="contained" onClick={clickHandler}>
          <OpenInNewIcon />
          Learn How
        </Button>
      </Box>
      <Typography className={'powered-by'}>Powered by Calyptia</Typography>
      <Box component="img" alt="Powered By Calyptia" src={destructureSrcFromLogo(CALYPTIA_VIVO_ICON)} />
    </Stack>
  );
};

export { CalyptiaLogo };
