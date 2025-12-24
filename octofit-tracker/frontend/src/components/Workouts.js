import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`)
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);
  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout, idx) => (
          <li key={idx}>{JSON.stringify(workout)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
