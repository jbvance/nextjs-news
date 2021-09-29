import { useState } from 'react';
import classes from './search-bar.module.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function searchHandler(event) {
    event.preventDefault();
    onSearch(searchTerm);
    setSearchTerm('');
  }

  function onSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className={classes.search_bar}>
      <form onSubmit={searchHandler}>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder="Search headlines"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
