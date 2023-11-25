import '@/styles/globals.css';
import '@/styles/App.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/lib/store';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
