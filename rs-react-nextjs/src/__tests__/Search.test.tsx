import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import { vi } from 'vitest';
import { localStorageKey } from '../../../old/src/constants/constants';
import App from '../../../old/src/App';

test('Check that the component retrieves the value from the local storage upon mounting', async () => {
  const testValue = '1234';
  const { unmount } = renderWithProviders(<App />);
  unmount();
  expect(localStorage.getItem(localStorageKey)).toEqual(null);
  vi.spyOn(Storage.prototype, 'getItem');
  localStorage.setItem(localStorageKey, testValue);
  renderWithProviders(<App />);
  expect(localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
  expect(localStorage.getItem(localStorageKey)).toEqual(testValue);
  const input = await screen.findByTestId('input-search');
  expect(input).toHaveValue(testValue);
  localStorage.clear();
});

test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
  const testValue = '5678';
  localStorage.clear();
  renderWithProviders(<App />);
  const input = await screen.findByTestId('input-search');
  await userEvent.type(input, testValue);
  const button = await screen.findByTestId('button-search');
  await userEvent.click(button);
  expect(localStorage.getItem(localStorageKey)).toEqual(testValue);
  localStorage.clear();
});
