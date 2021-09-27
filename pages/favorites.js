import { useEffect, useState, useContext } from 'react';
import Favorites from '../components/favorites/favorites';
import SourcesGrid from '../components/sources/sources-grid';
import FavoritesContext from '../store/favorites-context';
import SourcesContext from '../store/sources-context';

const FavoritesPage = () => {
  const favoritesCtx = useContext(FavoritesContext);
  const sourcesCtx = useContext(SourcesContext);

  if (favoritesCtx.isLoading) {
    return <p>Loading...</p>;
  }
  if (!favoritesCtx.favorites || favoritesCtx.favorites.length === 0) {
    return <p>No favorites found</p>;
  }

  function getNonFavorites() {
    const nonFavs = [];
    for (const source of sourcesCtx.sources) {
      //console.log(source);
      for (const favorite of favoritesCtx.favorites) {
        let found = false;
        if (source.id === favorite.id) {
          found = true;
          break;
        }
        if (!found) {
          nonFavs.push(source);
        }
      }
    }
    return nonFavs;
  }

  return (
    <div>
      <Favorites favorites={favoritesCtx.favorites} />
      <h2>Click a source below to add it to your favorites</h2>
      <SourcesGrid sourceList={getNonFavorites()} />
    </div>
  );
};

export default FavoritesPage;
