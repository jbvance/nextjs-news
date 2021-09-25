import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import SourcesGrid from '../components/sources/sources-grid';
import { SelectableTile } from '../components/ui/tile';
import classes from './dashboard.module.css';

const Dashboard = () => {
  const [sources, setSources] = useState();

  useEffect(() => {
    getSources();
  }, []);

  async function getSources() {
    const response = await fetch('/api/news/sources');
    const results = await response.json();
    console.log(results);
    setSources(results.data);
  }

  if (!sources) {
    return <div>...Loading</div>;
  }

  return (
    <div className={classes.dashboard}>
      <h1>Welcome!</h1>
      <h2>Available Sources</h2>
      <SourcesGrid sourceList={sources} />
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
