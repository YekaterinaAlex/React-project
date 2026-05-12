import CardList from './CardList';
import { render, screen } from '@testing-library/react';

describe('CardList', () => {
  it('renders message no results yet, when array no items in the array', () => {
    render(<CardList items={[]} onItemClick={vi.fn()} />);
    expect(screen.getByText('No results yet')).toBeInTheDocument();
  });
  it('renders all items, when array has items in the array', () => {
    const items = [
      { name: 'pikachu', description: 'Height: 4, Weight: 60' },
      { name: 'ditto', description: 'Height: 3, Weight: 40' },
    ];
    render(<CardList items={items} onItemClick={vi.fn()} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('ditto')).toBeInTheDocument();
    expect(screen.getByText('Height: 4, Weight: 60')).toBeInTheDocument();
    expect(screen.getByText('Height: 3, Weight: 40')).toBeInTheDocument();
  });
});
