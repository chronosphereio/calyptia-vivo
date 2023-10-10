import { VIVO_SIDEBAR_STYLE } from './constants';
import { CalyptiaLogo, HorizontalRule, VivoLogo, VivoMenu } from './elements';
import { Stack } from '@mui/material';
import { StreamKind } from '@calyptia-vivo/lib/types';

export interface VivoSideBarProps {
  menuActionHandler: (target: StreamKind) => void;
  learnHowActionHandler: () => void;
  active: StreamKind;
}

const VivoSideBar = ({ menuActionHandler, learnHowActionHandler, active }: VivoSideBarProps) => {
  return (  
    <Stack direction="column" sx={VIVO_SIDEBAR_STYLE}>
      <VivoLogo />
      <HorizontalRule />
      <VivoMenu active={active} clickHandler={menuActionHandler} />
      <CalyptiaLogo clickHandler={learnHowActionHandler} />
    </Stack>
  );
};

export default VivoSideBar;
