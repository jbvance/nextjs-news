import { useState } from 'react';
import { getSession } from 'next-auth/client';

const useAuth = () => {
  const [isLoading, setisLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState(null);

  const getUserSession = async () => {
    //setisLoading(true);
    try {
      getSession().then((session) => {
        if (!session) {
          return null;
        } else {
          return session;
          setLoadedSession(session);
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  return [isLoading, loadedSession, getUserSession];
};

export default useAuth;
