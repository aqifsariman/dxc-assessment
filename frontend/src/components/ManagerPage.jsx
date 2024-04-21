import React from 'react';
import AccessDenied from './AccessDenied';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

function ManagerPage() {
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');
  const { handleLogout } = useAuth();

  if (role !== 'manager' && role !== 'admin') {
    return <AccessDenied />;
  }
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar username={username} role={role} onLogout={handleLogout} />
      <div className="flex items-center justify-center p-6">
        <div className="p-6 bg-white shadow-md hover:sh-lg rounded-lg">
          <h1 className="text-xl font-bold">Manager Page</h1>
          <p>This page is restricted to managers only.</p>
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

export default ManagerPage;
