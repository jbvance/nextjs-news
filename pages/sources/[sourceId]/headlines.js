import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useApi from '../../../lib/useApi';
import HeadlinesGrid from '../../../components/headline/headlines-grid';

function Headlines() {
  const router = useRouter();
  const sourceId = router.query.sourceId;
  const [fetchData, isLoading, response, error] = useApi();
  const [headlines, setHeadline] = useState([]);

  useEffect(() => {
    if (sourceId) {
      getHeadlines(`/api/sources/${sourceId}/headlines`);
    }
  }, [sourceId]);

  async function getHeadlines(url) {
    try {
      await fetchData(url);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <p>...Loading</p>;

  if (response && response.data) {
    //console.log(JSON.stringify(response.data));
    return <HeadlinesGrid headlines={response.data.articles} />;
  }

  return <div>No Articles found</div>;
}

export default Headlines;
