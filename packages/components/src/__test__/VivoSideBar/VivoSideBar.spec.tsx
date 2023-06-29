import Meta, { Primary as DefaultStory } from '@calyptia-vivo/components/VivoSideBar/stories';
import { composeStory } from '@storybook/testing-react';
import { render } from '@testing-library/react';
console.log(Meta)
console.log(DefaultStory)
const Default = composeStory(DefaultStory, Meta);

describe('VivoSideBar', () => {
  it('renders with default args', () => {
    render(<Default />);
    expect(<Default />).not.toBeNull();
  });
});
