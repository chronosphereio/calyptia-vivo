
import Box from '@mui/material/Box';
import { VIVO_LOGO, CALYPTIA_VIVO_ICON } from '@calyptia-vivo/components/Icons';
import { destructureSrcFromLogo } from '@calyptia-vivo/components/utils';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Vivo/Icons',
  component: ({ icon } : any) => <Box component="img" alt="Powered By Calyptia" src={destructureSrcFromLogo(icon)} />,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    backgrounds: { default: 'dark'}
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const VivoLogo = {  
  args: {
    icon: VIVO_LOGO
},};

export const CalyptiaVivoIcon = {  
  args: {
    icon: CALYPTIA_VIVO_ICON
},};
