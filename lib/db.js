import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://nextjsnewsuser:nextjsnewspassword@cluster0.0liha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  );

  return client;
}
