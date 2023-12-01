import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import ReactHookForm from './components/ReactHookForm/ReactHookForm';
import Fallback from './components/Fallback/Fallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Fallback />,
  },
  {
    path: 'uncontrolled',
    element: <UncontrolledForm />,
  },
  {
    path: 'controlled',
    element: <ReactHookForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
