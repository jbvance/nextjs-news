import { useContext } from 'react';
import Link from 'next/link';
import FavoritesContext from '../../store/favorites-context';
import classes from './favorites-list.module.css';

const FavoritesList = (props) => {
  const favoritesCtx = useContext(FavoritesContext);

  function getFavorites() {
    if (favoritesCtx.favorites && favoritesCtx.favorites.length > 0) {
      return (
        <div className={classes.favorites_container}>
          <div>
            Select a favorite below to show the latest headlines for that news
            source!
          </div>
          <div className={classes.favorites_grid}>
            {favoritesCtx.favorites.map((fav) => {
              return (
                <div
                  className={
                    favoritesCtx.selectedFavorite &&
                    fav.id === favoritesCtx.selectedFavorite.id
                      ? classes.favorites_grid_item_selected
                      : classes.favorites_grid_item
                  }
                  key={fav.id}
                  onClick={() => props.onChangeFavorite(fav.id)}
                >
                  {fav.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (favoritesCtx.isLoading) {
      return null;
    } else {
      return (
        <div>
          You don't have any favorites yet.{' '}
          <Link href="/favorites">
            <button>Click here to add some favorite news sources.</button>
          </Link>
        </div>
      );
    }
  }

  return <div>{getFavorites()}</div>;
};

export default FavoritesList;
