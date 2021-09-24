async function handler(req, res) {
  const url = 'https://newsapi.org/v2/sources?language=en&country=us';
  try {
    const results = await fetch(url, {
      headers: {
        'X-API-KEY': process.env.NEWS_API_KEY
      }
    });
    results = await response.json();
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load sources' });
  }
}
