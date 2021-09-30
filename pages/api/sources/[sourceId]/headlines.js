import { getSession } from 'next-auth/client';
import articles from '../../../../lib/dummy-headlines';

async function handler(req, res) {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  // For now, development, use dummy aritcles to prevent reaching cap on NewsAPI usage
  if (process.env.ENVIRONMENT === 'dev') {
    return res.status(200).json({
      data: {
        status: 'ok',
        totalResults: 10,
        articles,
      },
    });
  }

  const { sourceId } = req.query;
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${sourceId}&pageSize=${
        process.env.PAGE_SIZE || 25
      }`,
      {
        headers: {
          'X-API-KEY': process.env.NEWS_API_KEY,
        },
      }
    );
    const data = await response.json();
    //('DATA', data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log('ERROR', error);
    return res.status(500).json({ error: error.message });
  }
}

export default handler;
