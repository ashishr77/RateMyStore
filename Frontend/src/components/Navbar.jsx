import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0">
      <Link to="/" className="text-lg font-bold text-blue-600">
        RateMyStore
      </Link>

      <div className="flex items-center gap-4">
        {!auth.token ? (
          <>
            {!isLoginPage && (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
           { isLoginPage && (<Link to="/register" className="text-gray-700 hover:text-blue-600">
              Signup
            </Link>)}
          </>
        ) : (
          <>
            <span className="text-gray-700 font-medium">
              {auth.user?.name} ({auth.user?.role})
            </span>
            <button
              onClick={logout}
              className="text-red-600 hover:underline text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
