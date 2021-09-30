import dummySources from '../../../lib/dummy-sources';
async function handler(req, res) {
  // For development, use dummy-sources file to prevent NewsAPI requests from reaching daily limit.
  // Remove for production and call API instead
  if (process.env.ENVIRONMENT === 'dev') {
    const sources = dummySources;
    return res.status(200).json({ data: sources });
  }

  const url = `https://newsapi.org/v2/sources?language=en&country=us`;
  try {
    const response = await fetch(url, {
      headers: {
        'X-API-KEY': process.env.NEWS_API_KEY,
      },
    });
    const results = await response.json();
    return res.status(200).json({ data: results.sources });
  } catch (error) {
    console.log('ERROR Loading Sources', error);
    res.status(500).json({ message: 'Unable to load sources' });
  }
}

export default handler;
