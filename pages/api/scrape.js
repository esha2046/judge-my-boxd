import puppeteer from 'puppeteer'; // will be used for scraping

export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const browser = await puppeteer.launch({ headless: true }); // runs browser in background
    const page = await browser.newPage();
    await page.goto(`https://letterboxd.com/${username}/`);

    const top4 = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.poster-list li.poster-container')).slice(0, 4).map(film => {
        return {
          title: film.querySelector('.film-poster').getAttribute('data-film-name'),
          year: film.querySelector('.film-poster').getAttribute('data-film-release-year'),
          url: `https://letterboxd.com${film.querySelector('.film-poster').getAttribute('data-target-link')}`,
          posterUrl: film.querySelector('.film-poster img').getAttribute('src')
        };
      });
    });

    await browser.close();
    res.status(200).json({ top4 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Top 4' });
  }
}