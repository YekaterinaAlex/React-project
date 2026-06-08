import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import UncontrolledForm from './UncontrolledForm';
import { store } from '../../store/store';

const renderForm = () =>
  render(
    <Provider store={store}>
      <UncontrolledForm onSuccess={vi.fn()} />
    </Provider>
  );

describe('UncontrolledForm', () => {
  it('shows name validation error on submit', async () => {
    const user = userEvent.setup();

    renderForm();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });
});
