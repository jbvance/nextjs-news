import { getSession } from 'next-auth/client';
import articles from '../../../lib/dummy-headlines';

// Returns top headlines from all sources (not just favorites)
async function handler(req, res) {
  const session = await getSession({ req: req });

  // get sources if sent via querystring
  let sources = '';
  if (req.query && req.query.sources) {
    sources = req.query.sources;
  }

  //console.log('SOURCES', sources);

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  // For now, return dummy articles to prevent reaching cap on NewsAPI usage
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
    let url;
    if (!sources) {
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${
        process.env.PAGE_SIZE || 25
      }`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?sources=${sources}&pageSize=${
        process.env.PAGE_SIZE || 25
      }`;
    }
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': process.env.NEWS_API_KEY,
      },
    });
    const data = await response.json();
    //('DATA', data);
    return res.status(200).json({ data });
  } catch (error) {
    console.log('ERROR', error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

export default handler;
