// src/pages/StoreDashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../auth/AuthContext';

const StoreDashboard = () => {
  const { auth, logout } = useAuth();
  const [storeData, setStoreData] = useState({
    ratings: [],
    averageRating: 0,
    totalRatings: 0
  });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/store/ratings');
      
      // Match the exact response structure from your backend
      setStoreData({
        ratings: res.data.ratings || [],
        averageRating: parseFloat(res.data.averageRating) || 0,
        totalRatings: res.data.totalRatings || 0
      });
      
    } catch (err) {
      setError('Failed to load store data');
      console.error('Error fetching store data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/store/update-password', { newPassword: password });
      alert('Password updated successfully');
      setPassword('');
    } catch (err) {
      setError('Failed to update password');
      console.error('Password update error:', err);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="p-4 max-w-4xl mx-auto">
          <div className="text-center py-8">
            <p>Loading store data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-center">
          Welcome, {auth?.user?.name || 'Store Owner'}
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        {/* Store Stats Section */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Store Rating Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold">
                {storeData.averageRating.toFixed(1)} ★
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Ratings</p>
              <p className="text-2xl font-bold">{storeData.totalRatings}</p>
            </div>
          </div>
        </div>

        {/* Ratings List Section */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Ratings</h3>
          {storeData.ratings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No ratings received yet
            </p>
          ) : (
            <ul className="space-y-3">
              {storeData.ratings.map((rating, index) => (
                <li 
                  key={index} 
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{rating.userEmail}</p>
                      <p className="text-sm text-gray-500">
                        User ID: {rating.userId}
                      </p>
                    </div>
                    <span className="text-yellow-500 font-bold text-xl">
                      {rating.rating} ★
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Password Update Section */}
        <form 
          onSubmit={handlePasswordUpdate}
          className="bg-white p-4 rounded-md shadow"
        >
          <h3 className="text-lg font-semibold mb-3">Update Password</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
                required
                minLength="8"
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Update Password
            </button>
          </div>
        </form>

        {/* Logout Button */}
        <div className="text-center pt-4">
          <button
            onClick={logout}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;