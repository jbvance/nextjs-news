import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const { sourceId } = req.query;
  console.log('QUERY', req.query);
  return res.status(200).json({ message: 'Got headlines' });
}

export default handler;
