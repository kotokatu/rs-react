import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import Details from './components/Details/Details';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Details />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
