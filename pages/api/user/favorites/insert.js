import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
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

  const { id, category, country, description, language, name, url } =
    JSON.parse(req.body);
  const user_id = user._id.toString();

  try {
    const favoritesCollection = client.db().collection('favorites');
    // create a document to insert
    const doc = {
      id,
      category,
      country,
      description,
      language,
      name,
      url,
      user_id,
    };
    const result = await favoritesCollection.insertOne(doc);
    res.status(201).json({ result });
    //console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error inserting favorite - ' + error.message });
  } finally {
    await client.close();
  }
}

export default handler;
