export default function Stats({ stats }) {
  if (!stats) return null;
  
  return (
    <div className="stats">
      <h2>Your Verdict:</h2>
      <p>{stats.genreBias || 'Analyzing genres...'}</p>
      <p>{stats.decadeMessage || 'Checking decades...'}</p>
      <p className="roast">{stats.roast || 'Preparing judgment...'}</p>
    </div>
  );
}