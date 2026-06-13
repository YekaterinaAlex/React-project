import CardList from './CardList';
import { render, screen } from '@testing-library/react';

describe('CardList', () => {
  it('renders message no results yet, when array no items in the array', () => {
    render(
      <CardList
        items={[]}
        onItemClick={vi.fn()}
        selectedItemNames={[]}
        onToggleSelect={vi.fn()}
      />
    );

    expect(screen.getByText('No results yet')).toBeInTheDocument();
  });

  it('renders all items, when array has items in the array', () => {
    const items = [{ name: 'pikachu' }, { name: 'ditto' }];

    render(
      <CardList
        items={items}
        onItemClick={vi.fn()}
        selectedItemNames={['pikachu']}
        onToggleSelect={vi.fn()}
      />
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();

    expect(screen.getByText('ditto')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });
});
