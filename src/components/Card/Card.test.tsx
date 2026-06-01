import Card from './Card';
import { render, screen } from '@testing-library/react';

describe('Card', () => {
  it('renders name ', () => {
    render(
      <Card
        name="pikachu"
        onClick={() => undefined}
        isSelected={false}
        onToggleSelect={() => undefined}
      />
    );
    expect(screen.getByText('pikachu')).toBeInTheDocument();

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
