export default function handler(req, res) {
  const { top4 } = req.body;

  // Example stats logic
  const genres = top4.map(film => film.genre || 'Unknown'); // Requires genre data (see notes)
  const decades = top4.map(film => Math.floor(film.year / 10) * 10);
  const isBasic = top4.every(film => film.isPopular); // Mock check

  const stats = {
    genreBias: `${(genres.filter(g => g === 'Horror').length / 4) * 100}% Horror`,
    decadeMessage: `You love the ${Math.max(...decades)}s!`,
    roast: isBasic ? "All Top 250 films... how original." : "Eclectic taste!",
  };

  res.status(200).json({ stats });
}