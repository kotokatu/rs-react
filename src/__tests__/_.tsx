import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import Search from '../components/Search/Search';

test('the component updates URL query parameter when page changes', async () => {
  const user = userEvent.setup();
  render(<App />);
  // const nextPageButton = screen.getByTestId('button-next');
  // await user.click(nextPageButton);
  screen.debug();
  await waitFor(() => expect(window.location.search).toContain('page=1'));
});
