// src/pages/UserDashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../auth/AuthContext';

const Star = ({ filled, onClick }) => (
  <span
    onClick={onClick}
    className={`cursor-pointer text-2xl ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
  >
    ★
  </span>
);

const UserDashboard = () => {
  const { logout } = useAuth();
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const [password, setPassword] = useState('');

  const fetchStores = async () => {
    try {
      const res = await API.get('/users/stores');
      console.log("Kuch Mila :",res.data);
      setStores(res.data);
    } catch (err) {
      alert('Failed to load stores : ', err);
    }
  };

  const rateStore = async (storeId, rating) => {
    try {
      await API.post('/rate', { storeId, rating });
      alert('Rated successfully!');
      fetchStores();
    } catch (err) {
      alert(err?.response?.data?.message || 'Rating failed');
    }
  };

  const updatePassword = async () => {
    if (password.length < 8) {  // Add validation
      alert('Password must be at least 8 characters');
      return;
    }
    try {
      await API.put('/update-password', { newPassword: password });
      alert('Password updated successfully');
      setPassword('');
    } catch (err) {
      alert(err?.response?.data?.message || 'Update failed');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold mb-4">All Stores</h2>

        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white p-4 rounded-md shadow space-y-2 border"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{store.name}</h3>
                <p className="text-sm text-gray-600">{store.address}</p>
              </div>
              <div className="text-sm">
                <strong>{store.avgRating?.toFixed(1) || 'N/A'}</strong> ★ avg ({store.totalRatings || 0} ratings)
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={ratings[store.id] >= star}
                  onClick={() => setRatings({ ...ratings, [store.id]: star })}
                />
              ))}
              <button
                onClick={() => rateStore(store.id, ratings[store.id])}
                className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        ))}

        <div className="bg-white mt-8 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-2">Update Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <button
            onClick={updatePassword}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Update Password
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="text-red-600 underline text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
