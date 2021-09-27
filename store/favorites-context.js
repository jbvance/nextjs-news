import { createContext, useState, useEffect } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  loadFavorites: function () {},
  isLoading: false,
  addFavorite: function () {},
  deleteFavorite: function () {}
});

export function FavoritesContextProvider(props) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      loadFavoritesHandler();
    }
  }, [favorites]);

  function addFavorite(id) {
    console.log('adding favorite');
  }

  function deleteFavorite() {
    console.log('deleting favorite');
  }

  async function loadFavoritesHandler() {
    setIsLoading(true);
    console.log('IN LOADFAVORITES');
    const response = await fetch('/api/user/favorites');
    const results = await response.json();
    console.log('FAVORITES', results);
    setFavorites(results.data);
    setIsLoading(false);
  }

  const context = {
    favorites,
    loadFavorites: loadFavoritesHandler,
    addFavorite,
    deleteFavorite,
    isLoading
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
