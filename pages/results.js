import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Top4Grid from '../components/Top4Grid';
import Stats from '../components/Stats';

export default function Results() {
  const router = useRouter();
  const { username } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!username) return;
    
    fetch(`/api/scrape?username=${username}`)
      .then(res => res.json())
      .then(({ top4 }) => {
        return fetch('/api/stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ top4 }),
        })
          .then(res => res.json())
          .then(({ stats }) => setData({ top4, stats }));
      });
  }, [username]);

  if (!data) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Analyzing your film taste...</p>
      </div>
    );
  }

  return (
    <div className="results">
      <Top4Grid films={data?.top4 || []} />
      <Stats stats={data?.stats || {}} />
    </div>
  );
}