// src/Components/Login/RegisterForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice'; // Ensure correct import of the 'register' action

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth); // Accessing the registration status and error from the store

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://picsum.photos/800', // Default avatar for the user
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(credentials)); // Dispatching the 'register' action with user data
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold" htmlFor="name">Full Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold" htmlFor="email">Email Address:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-lg font-semibold" htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Register
          </button>

          {status === 'loading' && <p className="text-center mt-4 text-gray-600">Registering...</p>}
          {status === 'succeeded' && <p className="text-center mt-4 text-green-500">Registration successful!</p>}
          {status === 'failed' && <p className="text-center mt-4 text-red-500">Error: {error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
