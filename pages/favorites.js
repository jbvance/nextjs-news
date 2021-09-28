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

  function getNonFavorites() {
    const nonFavs = [];
    console.log('SOURCES', sourcesCtx.sources);
    if (!favoritesCtx.favorites || favoritesCtx.favorites.length === 0) {
      return sourcesCtx.sources;
    }
    for (const source of sourcesCtx.sources) {
      //console.log(source);
      let found = false;
      for (const favorite of favoritesCtx.favorites) {
        if (source.id === favorite.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        nonFavs.push(source);
      }
    }
    //console.log('NON-FAVS', nonFavs);
    return nonFavs;
  }

  return (
    <div>
      {favoritesCtx.favorites && favoritesCtx.favorites.length > 0 ? (
        <Favorites favorites={favoritesCtx.favorites} />
      ) : (
        <p>No favorites found</p>
      )}
      <h2>Click a source below to add it to your favorites</h2>
      <SourcesGrid sourceList={getNonFavorites()} />
    </div>
  );
};

export default FavoritesPage;
