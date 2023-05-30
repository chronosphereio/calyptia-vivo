import VivoSideBar from '@calyptia-vivo/components/VivoSideBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Vivo/SideBar',
  component: VivoSideBar,
  tags: ['autodocs'],
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {  
  args: {
    menuActionHandler: () => {}, 
    learnHowActionHandler: () => {}, 
    active: 'logs'
},};