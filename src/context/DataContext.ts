import { createContext } from 'react';
import { ApiResponse } from '../components/Search/Search';

const DataContext = createContext<ApiResponse>(null);

export default DataContext;
