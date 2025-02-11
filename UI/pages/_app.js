// import node module libraries
import { Analytics } from '@vercel/analytics/react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { SessionProvider } from 'next-auth/react';
import SessionManager from './SessionManager';

// import theme style scss file
import './../styles/theme.scss';

import '@/styles/styles.scss';

// import default layouts
import ErrorBoundary from '@/components/ErrorBoundary';
import DefaultDashboardLayout from '@/layouts/DefaultDashboardLayout';
import { Provider } from 'react-redux';
import { store } from './../redux/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = 'Dash UI - Next.Js Admin Dashboard Template';
  const description =
    'Dash is a fully responsive and yet modern premium Nextjs template & snippets. Geek is feature-rich Nextjs components and beautifully designed pages that help you create the best possible website and web application projects. Nextjs Snippet ';
  const keywords =
    'Dash UI, Nextjs, Next.js, Course, Sass, landing, Marketing, admin themes, Nextjs admin, Nextjs dashboard, ui kit, web app, multipurpose';

  // Identify the layout, which will be applied conditionally
  const Layout =
    Component.Layout ||
    (router.pathname.includes('dashboard')
      ? router.pathname.includes('instructor') ||
        router.pathname.includes('student')
        ? DefaultDashboardLayout
        : DefaultDashboardLayout
      : DefaultDashboardLayout);

  console.log(session, 'session', Component.auth);
  return (
    <SessionProvider session={session} refetchOnWindowFocus>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content={keywords} />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <NextSeo
          title={title}
          description={description}
          canonical={pageURL}
          openGraph={{
            url: pageURL,
            title: title,
            description: description,
            site_name: process.env.siteName,
          }}
        />
        <Layout>
          <SessionManager>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </SessionManager>

          <Analytics />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  return children;
}

export default MyApp;
