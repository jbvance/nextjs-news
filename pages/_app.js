import { Provider } from 'next-auth/client';

import Layout from '../components/layout/layout';
import { FavoritesContextProvider } from '../store/favorites-context';
import { NotificationContextProvider } from '../store/notification-context';
import { SourcesContextProvider } from '../store/sources-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <SourcesContextProvider>
        <FavoritesContextProvider>
          <NotificationContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationContextProvider>
        </FavoritesContextProvider>
      </SourcesContextProvider>
    </Provider>
  );
}

export default MyApp;
