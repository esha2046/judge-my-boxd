export default function Top4Grid({ films }) {
  if (!films || films.length === 0) return null;
  
  return (
    <div className="top4-grid">
      {films.map((film) => (
        <div key={film.url} className="film">
          <img src={film.posterUrl} alt={film.title} />
          <p>{film.title} ({film.year})</p>
        </div>
      ))}
    </div>
  );
}