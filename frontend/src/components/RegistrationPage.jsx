import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    displayname: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 1,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_REGISTRATION_ENDPOINT,
        formData
      );

      console.log(response);
      if (!response.data.success) {
        throw new Error('Registration failed');
      }

      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message);
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Register a new account
        </h2>
        {error && <div className="text-red-500">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="displayName"
              className="text-sm font-medium text-gray-700"
            >
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your username"
              value={formData.displayName}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="confirmPassword"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
