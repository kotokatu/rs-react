import { waitFor, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search, { localStorageKey } from '../components/Search/Search';
import userEvent from '@testing-library/user-event';

test('Check that the component retrieves the value from the local storage upon mounting', async () => {
  await waitFor(() => localStorage.setItem(localStorageKey, '1234'));
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  const input = screen.getByTestId('input-search');
  expect(input).toHaveValue('1234');
  expect(input).not.toHaveValue('5678');
});

test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );
  const input = screen.getByTestId('input-search');
  await userEvent.type(input, '1234');
  const button = screen.getByTestId('button-search');
  await userEvent.click(button);
  await waitFor(async () => {
    expect(localStorage.getItem(localStorageKey)).toEqual('1234');
  });
});
