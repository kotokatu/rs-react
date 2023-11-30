import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import ControlledForm from './components/ControlledForm/ControlledForm';
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
    element: <ControlledForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
