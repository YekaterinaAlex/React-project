import Card from './Card/Card';
import { render, screen } from '@testing-library/react';

describe('Card', () => {
  it('renders name and description', () => {
    render(<Card name="pikachu" description="Height: 4, Weight: 60" />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('Height: 4, Weight: 60')).toBeInTheDocument();
  });
});
