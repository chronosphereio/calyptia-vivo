import VivoSideBar from '..';
import type { StoryFn, Meta} from '@storybook/react';

const Template: StoryFn<typeof VivoSideBar> = (args: Parameters<typeof VivoSideBar>[0]) => (
  <VivoSideBar {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};

const story = {
  title: 'Components/VivoSideBar',
  component: VivoSideBar,

  argTypes: {},
} as Meta<typeof VivoSideBar>;

export default story;
