import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useApi from '../../../lib/useApi';

function Headlines() {
  const router = useRouter();
  const sourceId = router.query.sourceId;
  const [fetchData, isLoading, response, error] = useApi();

  useEffect(() => {
    if (sourceId) {
      getHeadlines(`/api/sources/${sourceId}/headlines`);
    }
  }, [sourceId]);

  async function getHeadlines(url) {
    await fetchData(url);
  }

  if (isLoading) return <p>...Loading</p>;
  if (response) {
    console.log(response);
  }

  return <div>Headlines</div>;
}

export default Headlines;
