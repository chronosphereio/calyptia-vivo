import { Box, Typography } from '@mui/material';
import { HEADER_STYLES } from '@calyptia-vivo/components/VivoPage/constants';

export interface HeaderProps {
  kind: string;
}

type  Content = { [key: string]: string; }

const Header = ({
  kind='logs'
}: HeaderProps) => {

  const titles : Content = {
    logs: 'Logs',
    metrics: 'Metrics',
    traces: 'Traces'
  }

  const content : Content = {
    logs: 'Explore the events that occurred within a set of components.',
    metrics: 'Track the occurrence of an event to perform an action.',
    traces: 'Track the occurrence of an event to perform an action.'
  }


  return (
    <Box sx={HEADER_STYLES}>
      <Typography className={'title'}>{titles[kind]}</Typography>
      <Typography className={'paragraph'}>{content[kind]}</Typography>
    </Box>
  );
};

export { Header };
