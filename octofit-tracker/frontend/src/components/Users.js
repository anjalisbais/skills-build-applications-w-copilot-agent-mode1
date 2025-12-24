import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
