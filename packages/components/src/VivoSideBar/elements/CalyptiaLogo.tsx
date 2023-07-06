import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { CALYPTIA_LOGO_STYLES } from '@calyptia-vivo/components/VivoSideBar/constants';

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
      <Typography className={'powered-by'}>Powered by <Link onClick={() => window.open('https://calyptia.com')} target="_blank">Calyptia</Link></Typography>      
    </Stack>
  );
};

export { CalyptiaLogo };
