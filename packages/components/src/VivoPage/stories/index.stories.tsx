import VivoPage from '@vivo/components/VivoPage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Vivo/Page',
  component: VivoPage,
  tags: ['autodocs'],
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {  
  args: {
    menuActionHandler: (target: string) => { alert(target) },
    learnHowActionHandler: () => { alert('learn how click') },
    recordStart: "1",
    recordEnd: "100",
    recordsPerPage: "10",
    page: "1",
    pageChangeHandler: (value: number) => { alert(value) },
    rowsPerPageHandler: (value: number) => { alert(value) },
    filterActionHandler: (target: string, field: string) => { alert(`${target}:${field}`) },
    rateActionHandler: (value: number) => { alert(value) },
    playActionHandler: (play: boolean) => { alert(play) },
    clearActionHandler: () => { alert('clear') },
    play: true,
    tab: 'logs',
    data: []
},};