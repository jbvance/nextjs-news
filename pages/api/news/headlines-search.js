import { getSession } from 'next-auth/client';
import articles from '../../../lib/dummy-headlines';

// Returns headlines from  user search query
async function handler(req, res) {
  const session = await getSession({ req: req });

  // verify  user is logged in
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  // get search term if sent via querystring
  const searchTerm =
    req.query && req.query.searchTerm
      ? encodeURIComponent(req.query.searchTerm)
      : '';

  //For development, return dummy articles to prevent reaching cap on NewsAPI usage
  if (process.env.ENVIRONMENT === 'dev') {
    return res.status(200).json({
      data: {
        status: 'ok',
        totalResults: 10,
        articles,
      },
    });
  }

  try {
    let url = `https://newsapi.org/v2/everything?sortBy=publishedAt&pageSize=${
      process.env.PAGE_SIZE || 25
    }`;
    if (searchTerm) {
      url += url = `&q=${searchTerm}`;
    }
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': process.env.NEWS_API_KEY,
      },
    });
    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error) {
    console.log('ERROR', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

export default handler;
