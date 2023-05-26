import VivoPaginator from '..';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Vivo/LogTable',
  component: VivoPaginator,
  tags: ['autodocs'],
  argTypes: {},
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Logs = {  
  args: {
    rows: [{
        id: 'id',
        record: [[
            1685135789000000000,
            'meta'
          ],
          { event: 'event'}
        ],
    },{
        id: 'id',
        record: [[
            1685135789000000000,
            'meta'
          ],
          { event: 'event'}
        ],
    },{
        id: 'id',
        record: [[
            1685135789000000000,
            'meta'
          ],
          { event: 'event'}
        ],
    },{
        id: 'id',
        record: [[
            1685135789000000000,
            'meta'
          ],
          { event: 'event'}
        ],
    }],
    kind: "logs"
},};

export const Other = {  
    args: {
      rows: [
        {id: 'id', record: { event: 'event'}},
        {id: 'id', record: { event: 'event'}},
        {id: 'id', record: { event: 'event'}},
        {id: 'id', record: { event: 'event'}},
      ],
      kind: "other"
  },};