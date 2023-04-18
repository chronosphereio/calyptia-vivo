import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';

import { MENU_STYLE } from '../constants';

interface VivoMenuProps {
  clickHandler: (target: string) => void;
  active: string
}

const VivoMenu = ({ clickHandler, active='logs' }: VivoMenuProps) => {
  return (
    <Stack direction="row" className={'vivo-menu menu-stack'} spacing={1}>
      <List sx={MENU_STYLE} aria-label="contacts">
        <ListItem disablePadding>
          <ListItemButton className={active == 'logs' ? 'active' : ''} onClick={() => clickHandler('logs')}>
            <ListItemIcon>
              <InsertChartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className={active == 'metrics' ? 'active' : ''} onClick={() => clickHandler('metrics')}>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary="Metrics" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className={active == 'traces' ? 'active' : ''} onClick={() => clickHandler('traces')}>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Traces" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
};

export { VivoMenu };
