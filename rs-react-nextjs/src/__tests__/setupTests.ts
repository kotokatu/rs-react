import '@testing-library/jest-dom/vitest';
import { server } from './mocks/server.js';
import { apiSlice } from '../../../old/src/features/api/apiSlice.js';
import { setupStore } from '../../../old/src/store/store.js';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});
afterAll(() => server.close());
