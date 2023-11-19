import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import { vi } from 'vitest';
import { localStorageKey } from '../constants/constants';
import App from '../App';

test('Check that the component retrieves the value from the local storage upon mounting', async () => {
  const testValue = '1234';
  const { unmount } = renderWithProviders(<App />);
  unmount();
  expect(localStorage.getItem(localStorageKey)).toEqual(null);
  vi.spyOn(Storage.prototype, 'getItem');
  await waitFor(() => {
    localStorage.setItem(localStorageKey, testValue);
  });
  renderWithProviders(<App />);
  expect(localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
  expect(localStorage.getItem(localStorageKey)).toEqual(testValue);
  await waitFor(() => {
    const input = screen.getByTestId('input-search');
    expect(input).toHaveValue(testValue);
  });
  localStorage.clear();
});

test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
  localStorage.clear();
  renderWithProviders(<App />);
  await waitFor(async () => {
    const input = screen.getByTestId('input-search');
    await userEvent.type(input, '5678');
    const button = screen.getByTestId('button-search');
    await userEvent.click(button);
    expect(localStorage.getItem(localStorageKey)).toEqual('5678');
  });
  localStorage.clear();
});
