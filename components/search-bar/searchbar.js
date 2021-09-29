import { useRef } from 'react';
import classes from './search-bar.module.css';

function SearchBar({ onSearch }) {
  const searchTermRef = useRef();

  function searchHandler(event) {
    event.preventDefault();
    onSearch(searchTermRef.current.value);
  }

  return (
    <div className={classes.search_bar}>
      <form onSubmit={searchHandler}>
        <input ref={searchTermRef} type="text" placeholder="Search headlines" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
