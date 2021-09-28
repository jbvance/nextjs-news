import { useEffect, useState, useContext } from 'react';
import { getSession } from 'next-auth/client';
import HeadlinesGrid from '../components/headline/headlines-grid';
import classes from './dashboard.module.css';
import SourcesContext from '../store/sources-context';
import NotificationContext from '../store/notification-context';
import FavoritesContext from '../store/favorites-context';
import { HeadlinesContextProvider } from '../store/headlines-context';
import FavoritesList from '../components/favorites/favorites-list';
import HeadlinesContext from '../store/headlines-context';

const Dashboard = () => {
  const sourcesCtx = useContext(SourcesContext);
  const notificationCtx = useContext(NotificationContext);
  const favoritesCtx = useContext(FavoritesContext);
  const headlinesCtx = useContext(HeadlinesContext);

  useEffect(() => {
    // If news sources have not yet been set in sources context,
    // load them here from api. Otherwise, use sources stored in context
    if (!sourcesCtx.sources || sourcesCtx.sources.length === 0) {
      sourcesCtx.loadSources();
    }
  }, []);

  if (!sourcesCtx.sources || sourcesCtx.sources.length === 0) {
    return <div>...Loading</div>;
  }

  async function loadArticlesBySourceId(id) {
    //console.log('clicked', favoritesCtx.selectedFavorite);
    console.log('ID', id);
    favoritesCtx.selectFavorite(id);
    headlinesCtx.loadHeadlines([id]);
  }

  return (
    <HeadlinesContextProvider>
      <div className={classes.dashboard}>
        <h1>Welcome!</h1>
        <FavoritesList onChangeFavorite={loadArticlesBySourceId} />
        <h2>Latest Headlines</h2>
        <HeadlinesGrid />
      </div>
    </HeadlinesContextProvider>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}

export default Dashboard;
