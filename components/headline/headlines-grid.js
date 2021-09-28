import { useContext, useEffect } from 'react';
import HeadlinesContext from '../../store/headlines-context';
import FavoritesContext from '../../store/favorites-context';
import Headline from './headline';
import classes from './headlines-grid.module.css';

function HeadlinesGrid({ headlines }) {
  const headlinesCtx = useContext(HeadlinesContext);
  const favoritesCtx = useContext(FavoritesContext);

  if (headlinesCtx.isLoading) {
    return <p>Loading...</p>;
  }

  if (!headlinesCtx.headlines || headlinesCtx.headlines.length === 0) {
    return <h2>Unable to load headlines</h2>;
  }

  function getFavorites() {
    if (favoritesCtx.favorites && favoritesCtx.favorites.length > 1) {
      return (
        <div className={classes.favorites_grid}>
          {favoritesCtx.favorites.map((fav) => {
            return <div key={fav.id}>{fav.name}</div>;
          })}
        </div>
      );
    } else if (favoritesCtx.isLoading) {
      return null;
    } else {
      return <div>No Favorites</div>;
    }
  }

  return (
    <div className={classes.headlines_grid}>
      {getFavorites()}
      {headlinesCtx.headlines.map((headline, index) => {
        return <Headline key={index} headline={headline} />;
      })}
    </div>
  );
}
export default HeadlinesGrid;
