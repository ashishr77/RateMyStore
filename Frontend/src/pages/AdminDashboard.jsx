// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../auth/AuthContext';

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">{label}</label>
    <input
      {...props}
      className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
);

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user',
  });
  const [storeForm, setStoreForm] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  /* --- Fetch helpers --- */
  const fetchStats = async () => {
    const res = await API.get('/admin/stats');
    setStats({
      users: res.data.totalUsers,
      stores: res.data.totalStores,
      ratings: res.data.totalRatings,
    });
  };

  const fetchStores = async () => {
    const res = await API.get('/admin/stores');
    setStores(res.data);
  };

  const fetchUsers = async () => {
    const res = await API.get('/admin/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchStats();
    fetchStores();
    fetchUsers();
  }, []);

  /* --- Create User/Admin --- */
  const createUser = async () => {
    try {
      await API.post('/admin/create-user', userForm);
      alert('User/Admin created');
      setUserForm({ name: '', email: '', password: '', address: '', role: 'user' });
      fetchUsers();
      fetchStats();
    } catch (err) {
      alert(err?.response?.data?.message || 'Create failed');
    }
  };

  /* --- Create Store --- */
  const createStore = async () => {
    try {
      await API.post('/admin/create-store', storeForm);
      alert('Store created');
      setStoreForm({ name: '', email: '', password: '', address: '' });
      fetchStores();
      fetchStats();
    } catch (err) {
      alert(err?.response?.data?.message || 'Create failed');
    }
  };

  const filteredStores = stores.filter((s) =>
    [s.name, s.email, s.address].some((f) => f.toLowerCase().includes(filter.toLowerCase()))
  );

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.address, u.role].some((f) =>
      f?.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-6xl mx-auto space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-blue-600">{stats.users}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Total Stores</p>
            <p className="text-2xl font-bold text-green-600">{stats.stores}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Total Ratings</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.ratings}</p>
          </div>
        </div>

        {/* Create User/Admin */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Add User/Admin</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Name" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
            <Input label="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
            <Input label="Password" type="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
            <Input label="Address" value={userForm.address} onChange={(e) => setUserForm({ ...userForm, address: e.target.value })} />
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Role</label>
              <select
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                className="border p-2 rounded-md"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button onClick={createUser} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create
          </button>
        </div>

        {/* Create Store */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Add Store</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Name" value={storeForm.name} onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })} />
            <Input label="Email" value={storeForm.email} onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })} />
            <Input label="Password" type="password" value={storeForm.password} onChange={(e) => setStoreForm({ ...storeForm, password: e.target.value })} />
            <Input label="Address" value={storeForm.address} onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })} />
          </div>
          <button onClick={createStore} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Create
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter by name, email, address, role..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
        </div>

        {/* Stores List */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Stores</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Avg Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{s.name}</td>
                    <td className="p-2">{s.email}</td>
                    <td className="p-2">{s.address}</td>
                    <td className="p-2">{s.averageRating?.toFixed(1) || 'N/A'} ★</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Users & Admins</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Address</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.address}</td>
                    <td className="p-2 capitalize">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center pb-8">
          <button onClick={logout} className="text-red-600 underline text-sm">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
