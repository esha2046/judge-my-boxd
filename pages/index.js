import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/results?username=${username}`);
  };

  return (
    <div className="container">
      <h1>Judge My Letterboxd Top 4</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your Letterboxd username"
        />
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
}