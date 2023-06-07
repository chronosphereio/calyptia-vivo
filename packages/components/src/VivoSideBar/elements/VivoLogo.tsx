import { destructureSrcFromLogo } from '@calyptia-vivo/components/utils';
import { VIVO_LOGO } from '@calyptia-vivo/components/Icons';
import { VIVO_LOGO_ICON, VIVO_LOGO_STACK, VIVO_LOGO_TEXT } from '@calyptia-vivo/components/VivoSideBar/constants';
import { Box, Stack, Typography } from '@mui/material';

const VivoLogo = () => {
  return (
    <Stack direction="column" spacing={1} sx={VIVO_LOGO_STACK} className={'vivo-logo menu-stack'}>
      <Box component="img" alt="Vivo Logo" sx={VIVO_LOGO_ICON} src={destructureSrcFromLogo(VIVO_LOGO)} />
      <Typography sx={VIVO_LOGO_TEXT} fontWeight={500} color="inherit">
        Telemetry Data
      </Typography>
    </Stack>
  );
};

export { VivoLogo };
