import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return;
  }

  let favorites = [];
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const client = await connectToDatabase();
  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    client.close();
    return;
  }

  const favoritesCollection = client.db().collection('favorites');

  const arr = await favoritesCollection.find({ user_id: user._id.toString() });
  //console.log('ARR', arr);
  arr.forEach(
    function (doc) {
      favorites.push(doc);
    },
    function (err) {
      client.close();
      if (!err) {
        return res.status(200).json({ data: favorites });
      } else {
        return res.status(500).json({ error: 'Unable to load favorites' });
      }
    }
  );

  //client.close();
  //return res.status(200).json({ user });
}

export default handler;
