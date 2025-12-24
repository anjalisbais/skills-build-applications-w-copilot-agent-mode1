import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`)
      .then(res => res.json())
      .then(data => setTeams(data));
  }, []);
  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team, idx) => (
          <li key={idx}>{JSON.stringify(team)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
