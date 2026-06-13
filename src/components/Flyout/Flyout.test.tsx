import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Flyout from './Flyout';

describe('Flyout', () => {
  it('does not render when no items are selected', () => {
    render(<Flyout items={[]} onUnselect={vi.fn()} onDownload={vi.fn()} />);
    expect(screen.queryByText(/item selected/i)).not.toBeInTheDocument();
  });

  it('renders selected count and calls actions', async () => {
    const user = userEvent.setup();
    const onUnselect = vi.fn();
    const onDownload = vi.fn();

    render(
      <Flyout
        items={[{ name: 'hypno' }]}
        onUnselect={onUnselect}
        onDownload={onDownload}
      />
    );
    expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(onUnselect).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /download/i }));
    expect(onDownload).toHaveBeenCalled();
  });
});
