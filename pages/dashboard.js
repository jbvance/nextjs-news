import { useEffect, useState, useContext } from 'react';
import { getSession } from 'next-auth/client';
import HeadlinesGrid from '../components/headline/headlines-grid';
import classes from './dashboard.module.css';
import SourcesContext from '../store/sources-context';
import NotificationContext from '../store/notification-context';
import FavoritesContext from '../store/favorites-context';
import FavoritesList from '../components/favorites/favorites-list';
import HeadlinesContext from '../store/headlines-context';
import SearchBar from '../components/search-bar/searchbar';

const Dashboard = () => {
  const sourcesCtx = useContext(SourcesContext);
  const notificationCtx = useContext(NotificationContext);
  const favoritesCtx = useContext(FavoritesContext);
  const headlinesCtx = useContext(HeadlinesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/auth';
      } else {
        if (!sourcesCtx.sources || sourcesCtx.sources.length === 0) {
          sourcesCtx.loadSources();
        }
        setIsLoading(false);
      }
    });
  });

  // useEffect(() => {
  //   // If news sources have not yet been set in sources context,
  //   // load them here from api. Otherwise, use sources stored in context
  //   if (
  //     loadedSession &&
  //     (!sourcesCtx.sources || sourcesCtx.sources.length === 0)
  //   ) {
  //     sourcesCtx.loadSources();
  //   }
  // }, [loadedSession]);

  console.log('ABOVE IS LOADING RENDER', isLoading);

  if (isLoading) {
    console.log('IS LOADING');
    return <div>...Loading</div>;
  }

  if (!sourcesCtx.sources || sourcesCtx.sources.length === 0) {
    return <div>...Loading</div>;
  }

  async function loadArticlesBySourceId(id) {
    // if user clicked the favorite that is already selected,
    // ignore and do NOT call the api
    if (
      favoritesCtx.selectedFavorite &&
      favoritesCtx.selectedFavorite.id === id
    ) {
      return;
    }
    //reset search term since we are now loading
    // by source(s) instead
    setSearchTerm('');

    // set the selected favorite and load headlines
    favoritesCtx.selectFavorite(id);
    headlinesCtx.loadHeadlines([id]);
  }

  async function searchHandler(term) {
    if (!term || term.length === 0) {
      return;
    }
    try {
      // Since we are going to perform a search, any favorite
      // that is currently selected should be deselected first
      favoritesCtx.selectFavorite(null);
      // Set search term to display after 'Headlines' in header
      setSearchTerm(term);
      headlinesCtx.loadSearchHeadlines(term);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={classes.dashboard}>
      <SearchBar onSearch={searchHandler} />
      <FavoritesList onChangeFavorite={loadArticlesBySourceId} />
      <h2>
        Headlines{' '}
        {favoritesCtx.selectedFavorite
          ? ` for ${favoritesCtx.selectedFavorite.name}`
          : searchTerm
          ? ` for "${searchTerm}"`
          : ''}
      </h2>
      <HeadlinesGrid />
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: { session }
//   };
// }

export default Dashboard;
