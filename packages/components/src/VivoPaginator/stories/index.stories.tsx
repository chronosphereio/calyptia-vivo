import VivoPaginator from '../';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Vivo/Paginator',
  component: VivoPaginator,
  tags: ['autodocs'],
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FirstPage = {  
  args: {
    recordStart: "1",
    recordEnd: "100",
    rowsPerPage: 10,
    page: 0,
    pageChangeHandler: (value: number) => {alert(value)},
    rowsPerPageHandler: (value: number) => {alert(value)}
},};

export const LastPage = {  
    args: {
      recordStart: "91",
      recordEnd: "100",
      rowsPerPage: 10,
      page: 10,
      pageChangeHandler: (value: number) => {alert(value)},
      rowsPerPageHandler: (value: number) => {alert(value)}
  },};

  export const MiddlePage = {  
    args: {
      recordStart: "11",
      recordEnd: "100",
      rowsPerPage: 10,
      page: 2,
      pageChangeHandler: (value: number) => {alert(value)},
      rowsPerPageHandler: (value: number) => {alert(value)}
  },};