
import VivoFilterBar from '../';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Vivo/FilterBar',
  component: VivoFilterBar,
  tags: ['autodocs'],
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Logs = {  
  args: {
    filterActionHandler: (target: string, field: string) => { alert(`${target}:${field}`)},
    rateActionHandler: (value: number) => alert(value),
    playActionHandler: (value: boolean) => { alert(value) },
    clearActionHandler: () => {alert('clear')},
    play: false,
    kind: 'logs',
  }
};

export const Other = {  
  args: {
    filterActionHandler: (target: string, field: string) => { alert(`${target}:${field}`)},
    rateActionHandler: (value: number) => alert(value),
    playActionHandler: (value: boolean) => { alert(value) },
    clearActionHandler: () => {alert('clear')},
    play: true,
    kind: 'other',
  }
};