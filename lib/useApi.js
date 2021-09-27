import { useEffect, useState } from 'react';

const useApi = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url, options = null) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        headers: {
          'X-API-KEY': process.env.NEWS_API_KEY
        }
      });
      const json = await res.json();

      setResponse(json);
      setIsLoading(false);
    } catch (error) {
      console.log('ERROR', error);
      setError(error);
      setIsLoading(false);
    }
  };

  return [fetchData, isLoading, response, error];
};

export default useApi;
