import { createContext, useState, useEffect } from 'react';

const HeadlinesContext = createContext({
  headlines: [],
  loadHeadlines: function (favorites = []) {},
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

  async function loadHeadlinesHandler(favorites = []) {
    //console.log('Loading headlines');
    try {
      let qry = '';
      if (favorites.length > 0) {
        qry = favorites.join(',');
        //console.log('QRY', qry);
      }
      const apiUrl = `/api/news/headlines${qry ? `?sources=${qry}` : ''}`;
      //console.log('URL', apiUrl);
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
