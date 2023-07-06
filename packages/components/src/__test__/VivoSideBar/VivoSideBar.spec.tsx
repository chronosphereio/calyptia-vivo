import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from '@calyptia-vivo/components/VivoSideBar/stories/index.stories';

const { Primary } = composeStories(stories);

test('VivoSideBar', () => {
  render(<Primary />);
  const SideBarElement = screen.getByText(
    /Calyptia/i
  );
  expect(SideBarElement).not.toBeNull();
});