import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import Fallback from './components/Fallback/Fallback';
import NotFound from './components/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
    errorElement: <Fallback />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <Fallback />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
