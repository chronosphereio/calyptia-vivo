import VivoSideBar from '../';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/VivoSideBar',
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