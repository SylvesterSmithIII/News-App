// LoginForm.jsx

import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setUser }) {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
    navigate("/")
  }

  return (
    <div className="max-w-md mx-auto">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" autoComplete="off" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="text"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
    </div>
    <div className="flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        LOG IN
      </button>
    </div>
  </form>
  <p className="text-red-500 text-xs italic">&nbsp;{error}</p>
</div>

  );
}