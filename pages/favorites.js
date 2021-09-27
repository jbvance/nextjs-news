import { useEffect, useState, useContext } from 'react';
import Favorites from '../components/favorites/favorites';
import FavoritesContext from '../store/favorites-context';

const FavoritesPage = () => {
  const favoritesCtx = useContext(FavoritesContext);

  if (favoritesCtx.isLoading) {
    return <p>Loading...</p>;
  }
  if (!favoritesCtx.favorites || favoritesCtx.favorites.length === 0) {
    return <p>No favorites found</p>;
  }

  return (
    <div>
      <Favorites favorites={favoritesCtx.favorites} />
    </div>
  );
};

export default FavoritesPage;
