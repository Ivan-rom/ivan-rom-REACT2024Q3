import '@/index.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import ContextProvider from '@/components/ContextProvider/ContextProvider';

function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default wrapper.withRedux(App);
