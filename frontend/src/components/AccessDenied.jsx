import React from 'react';
import { Link } from 'react-router-dom';

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md hover:sh-lg rounded-lg">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}

export default AccessDenied;
