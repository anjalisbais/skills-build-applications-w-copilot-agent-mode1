import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const url = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div className="col-md-4 mb-3" key={team.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">Members: {team.members?.length || 0}</p>
                <p className="card-text">Points: {team.points}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
