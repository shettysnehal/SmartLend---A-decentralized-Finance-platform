// pages/_app.js

import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/layout'
import 'semantic-ui-css/semantic.min.css'




function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/template.png" />
        <title>My Next.js App</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
