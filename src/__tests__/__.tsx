// import Pagination from '../components/Pagination/Pagination';
// import { vi } from 'vitest';
// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
// import DataContext from '../context/DataContext';
// import mockApiData from './mocks/mockData';

// const mockSearchParams = { page: '1' };

// vi.mock('react-router-dom', async () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const routerImport = await vi.importActual<any>('react-router-dom');
//   return {
//     ...routerImport,
//     useSearchParams: () => [new URLSearchParams(mockSearchParams)],
//   };
// });

// test('the component updates URL query parameter when page changes', async () => {
//   const user = userEvent.setup();
//   render(
//     <MemoryRouter>
//       <DataContext.Provider value={mockApiData}>
//         <Pagination
//           currentPage={1}
//           itemsPerPage={10}
//           setItemsPerPage={vi.fn()}
//           setPage={vi.fn()}
//         />
//       </DataContext.Provider>
//     </MemoryRouter>
//   );
//   const nextPageButton = screen.getByTestId('button-next');
//   await user.click(nextPageButton);
//   expect(window.location).toBe('https://www.google.com');
//   expect(window.location.search).toBe('fgfhfgfgh=3');
// });
