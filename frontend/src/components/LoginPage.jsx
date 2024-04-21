import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_LOGIN_ENDPOINT,
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('displayname', response.data.user.displayname);
        sessionStorage.setItem('role', response.data.user.role);
        navigate('/');
      }
    } catch (error) {
      setLoginError(error.response?.data?.message);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    alert('Forgot Password functionality not implemented yet.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid gap-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
          {loginError && <div className="text-red-500">{loginError}</div>}
          <form className="space-y-6" onSubmit={handleLogin}>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <button
                onClick={handleRegister}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register now
              </button>
            </p>
            <p className="text-sm mt-2">
              Forgot your password?{' '}
              <button
                onClick={handleForgotPassword}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Reset it here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
