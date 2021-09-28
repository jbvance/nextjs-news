import { useContext } from 'react';
import FavoritesContext from '../../store/favorites-context';
import classes from './favorites-list.module.css';

const FavoritesList = (props) => {
  const favoritesCtx = useContext(FavoritesContext);
  async function setFavorite() {}

  function getFavorites() {
    if (favoritesCtx.favorites && favoritesCtx.favorites.length > 1) {
      return (
        <div className={classes.favorites_grid}>
          {favoritesCtx.favorites.map((fav) => {
            return (
              <div
                className={
                  fav.id === favoritesCtx.selectedFavorite
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
      );
    } else if (favoritesCtx.isLoading) {
      return null;
    } else {
      return <div>No Favorites</div>;
    }
  }

  return <div>{getFavorites()}</div>;
};

export default FavoritesList;
