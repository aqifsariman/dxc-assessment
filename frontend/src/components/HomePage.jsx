import React from 'react';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const username = sessionStorage.getItem('username');
  const displayname = sessionStorage.getItem('displayname');
  const role = sessionStorage.getItem('role');
  const { handleLogout } = useAuth();

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar username={username} role={role} onLogout={handleLogout} />
      <div className="flex items-center justify-center p-6">
        <div className="p-6 bg-white shadow-md hover:sh-lg rounded-lg">
          <h1 className="text-2xl font-bold">
            WELCOME {displayname.toUpperCase()}!
          </h1>
          <p>Username: {username}</p>
          <p>Role: {role}</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur, eaque vero nemo facere est rerum debitis corrupti
            blanditiis sequi. Voluptatibus labore consequuntur quae eius
            explicabo, rem atque id deserunt magnam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
