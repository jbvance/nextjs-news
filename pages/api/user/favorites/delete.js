import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'DELETE') {
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

  const { id } = JSON.parse(req.body);
  const user_id = user._id.toString();

  try {
    const favoritesCollection = client.db().collection('favorites');
    const query = { id, user_id };
    const result = await favoritesCollection.deleteOne(query);
    if (result.deletedCount === 1) {
      res
        .status(204)
        .json({ status: 'success', message: 'Deleted One Favorites Record' });
    } else {
      res
        .status(500)
        .json({ status: 'error', message: 'Unable to delete Favorite' });
      console.log('No documents matched the query. Deleted 0 documents.');
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error inserting favorite - ' + error.message });
  } finally {
    await client.close();
  }
}

export default handler;
