import { getSession } from 'next-auth/client';
import { SelectableTile } from '../components/ui/tile';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <SelectableTile>
        <div>This is a tile</div>
      </SelectableTile>
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
