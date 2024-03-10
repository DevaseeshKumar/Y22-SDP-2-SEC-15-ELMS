// Home.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const email = location.state && location.state.email;

  return (
    <div>
      <h1>Welcome {email || 'Guest'}</h1>
    </div>
  );
};

export default Home;
