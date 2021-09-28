import { createContext, useState, useEffect } from 'react';

const HeadlinesContext = createContext({
  headlines: [],
  loadHeadlines: function () {},
  isLoading: false
});

export function HeadlinesContextProvider(props) {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!headlines || headlines.length === 0) {
      loadHeadlinesHandler();
    }
  }, []);

  async function loadHeadlinesHandler(onlyFavorites = false) {
    try {
      const apiUrl = onlyFavorites ? '' : '/api/news/headlines';
      const response = await fetch(apiUrl);
      const results = await response.json();
      setHeadlines(results.data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const context = {
    headlines,
    loadHeadlines: loadHeadlinesHandler,
    isLoading
  };

  return (
    <HeadlinesContext.Provider value={context}>
      {props.children}
    </HeadlinesContext.Provider>
  );
}

export default HeadlinesContext;
