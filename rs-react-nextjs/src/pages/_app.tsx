import '@/styles/globals.css';
import '@/styles/App.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/lib/store';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
