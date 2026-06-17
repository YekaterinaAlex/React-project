import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import ReactHookForm from './ReactHookForm';
import { store } from '../../store/store';

const renderForm = () =>
  render(
    <Provider store={store}>
      <ReactHookForm onSuccess={vi.fn()} />
    </Provider>
  );

describe('ReactHookForm', () => {
  it('keeps submit button disabled when form is invalid', () => {
    renderForm();

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });
});
