import { useEffect } from 'react';
import { getSession } from 'next-auth/client';
import SourcesGrid from '../components/sources/sources-grid';
import { SelectableTile } from '../components/ui/tile';
import dummySources from '../lib/dummy-sources';

const Dashboard = () => {
  useEffect(() => {
    // For now, use dummy-sources file to prevent NewsAPI requests from reaching daily limit.
    // Remove for production and call API instead
    //getSources();
  }, []);

  async function getSources() {
    const response = await fetch('/api/news/sources');
    const data = await response.json();
    console.log('DATA', data);
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <SelectableTile>
        <div>This is a tile</div>
      </SelectableTile>
      <SourcesGrid sourceList={dummySources.data} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Dashboard;
