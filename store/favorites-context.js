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

  function addFavorite(item) {
    console.log('adding favorite');
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  }

  function deleteFavorite(id) {
    console.log('deleting favorite');
    const newFavs = favorites.filter((fav) => {
      console.log('FAV', fav);
      return fav.id === id;
    });
    console.log(newFavs);
    setFavorites((prevFavorites) => newFavs);
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
