import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Search from './components/Search/Search';
import Details from './components/Details/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Search />}>
      <Route path="/" element={<Details />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
