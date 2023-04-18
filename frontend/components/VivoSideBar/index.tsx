import { VIVO_SIDEBAR_STYLE } from './constants';
import { CalyptiaLogo, HorizontalRule, VivoLogo, VivoMenu } from './elements';
import { Stack } from '@mui/material';

export interface VivoSideBarProps {
  menuActionHandler: (target: string) => void;
  learnHowActionHandler: () => void;
  active: string;
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
