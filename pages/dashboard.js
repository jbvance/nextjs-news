import { useEffect, useState, useContext } from 'react';
import { getSession } from 'next-auth/client';
import SourcesGrid from '../components/sources/sources-grid';
import { SelectableTile } from '../components/ui/tile';
import classes from './dashboard.module.css';
import SourcesContext from '../store/sources-context';
import NotificationContext from '../store/notification-context';

const Dashboard = () => {
  const [sources, setSources] = useState();
  const sourcesCtx = useContext(SourcesContext);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    // If news sources have not yet been set in sources context,
    // load them here from api. Otherwise, use sources stored in context
    if (!sourcesCtx.sources || sourcesCtx.sources.length === 0) {
      sourcesCtx.loadSources();
    }
  }, []);

  if (!sourcesCtx.sources || sourcesCtx.sources.length === 0) {
    return <div>...Loading</div>;
  }

  return (
    <div className={classes.dashboard}>
      <h1>Welcome!</h1>
      <h2>Available Sources</h2>
      <SourcesGrid sourceList={sourcesCtx.sources} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}

export default Dashboard;
