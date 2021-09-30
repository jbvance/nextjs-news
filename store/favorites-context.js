import { createContext, useState, useEffect } from 'react';
import { compare } from '../lib/utils';

const FavoritesContext = createContext({
  favorites: [],
  loadFavorites: function () {},
  isLoading: false,
  addFavorite: function (item) {},
  deleteFavorite: function (id) {},
  selectFavorite: function (id) {},
  selectedFavorite: '',
});

export function FavoritesContextProvider(props) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      loadFavoritesHandler();
    }
  }, []);

  async function addFavorite(item) {
    const { id, category, country, description, language, name, url } = item;
    try {
      const result = await fetch('/api/user/favorites/insert', {
        method: 'POST',
        body: JSON.stringify({ ...item }),
      });
      if (result.ok) {
        setFavorites((prevFavs) => [...prevFavs, item]);
      }
      if (!result.ok) {
        console.log('UNABLE TO INSERT');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFavorite(id) {
    const result = await fetch('/api/user/favorites/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    const newFavs = favorites.filter((fav) => {
      return fav.id !== id;
    });
    setFavorites(newFavs);
  }

  async function loadFavoritesHandler() {
    setIsLoading(true);
    const response = await fetch('/api/user/favorites');
    const results = await response.json();
    setFavorites(results.data.sort(compare));
    setIsLoading(false);
  }

  function selectFavorite(id) {
    const favToSelect = favorites.find((fav) => fav.id === id);
    setSelectedFavorite(favToSelect);
  }

  const context = {
    favorites,
    loadFavorites: loadFavoritesHandler,
    addFavorite,
    deleteFavorite,
    isLoading,
    selectFavorite,
    selectedFavorite,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
