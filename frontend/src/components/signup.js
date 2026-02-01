import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({setUser}) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending data to our Node.js backend
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      setUser(res.data.username);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed. Try a different username/email.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl w-96 border-t-4 border-blue-500">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            required
            placeholder="email@example.com"
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold transition-colors bg-blue-600 hover:bg-blue-700"
        >
          Signup
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-bold hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Signup;