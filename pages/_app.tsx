import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
// Components
import Nav from '../components/Nav';
import Footer from '../components/Footer';
// Next
import Head from 'next/head';
// Animation
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className='overflow-hidden bg-blackLighter'>
        <Head>
          <title>PokePrice</title>
          <meta
            name='description'
            content='Pokemon TCG price guide made with Next.js'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Nav />
        <AnimatePresence
          exitBeforeEnter
          // initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp;
