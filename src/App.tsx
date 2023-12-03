import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import FormWithReactHookForm from './components/ReactHookForm/ReactHookForm';
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
    path: 'with-react-hook-form',
    element: <FormWithReactHookForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
