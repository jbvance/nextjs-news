import { useEffect, useState, useContext } from 'react';
import { getSession } from 'next-auth/client';
import SourcesGrid from '../sources/sources-grid';
import classes from './favorites.module.css';
import SourcesContext from '../../store/sources-context';
import NotificationContext from '../../store/notification-context';

const Favorites = ({ favorites }) => {
  if (!favorites || favorites.length === 0) {
    return <div>No favorites found</div>;
  }

  return (
    <div className={classes.favorites}>
      <h2>Favorites</h2>
      <SourcesGrid sourceList={favorites} deletable={true} />
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

export default Favorites;
