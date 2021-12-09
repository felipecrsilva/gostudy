import type { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { AuthProvider } from '../context/Auth';
import { Provider as NextAuthProvider } from 'next-auth/client'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <AuthProvider>
        <Header />

        <Component {...pageProps} />
      </AuthProvider>
    </NextAuthProvider>
  );
}

export default MyApp
