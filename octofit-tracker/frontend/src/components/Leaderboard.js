import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`)
      .then(res => res.json())
      .then(data => setLeaders(data));
  }, []);
  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((leader, idx) => (
          <li key={idx}>{JSON.stringify(leader)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
