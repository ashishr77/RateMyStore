import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });
  const [nameError, setNameError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const trimmedValue = value.trim();
      const nameRegex = /^[a-zA-Z\s]*$/; // Allow letters and spaces
      const letterCount = (trimmedValue.match(/[a-zA-Z]/g) || []).length;

      if (!trimmedValue) {
        setNameError('Name cannot be empty or only spaces');
      } else if (!nameRegex.test(value)) {
        setNameError('Name must contain only letters and spaces');
      } else if (letterCount < 3) {
        setNameError('Name must contain at least 3 letters');
      } else {
        setNameError('');
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError || !form.name.trim()) {
      alert('Please fix the name field error before submitting');
      return;
    }
    try {
      await API.post('/register', { ...form, name: form.name.trim() });
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Signup</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring ${nameError ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          disabled={!!nameError}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
