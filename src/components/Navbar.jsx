import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/ServiceContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Deteksi Hoaks
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">
              Beranda
            </Link>
            <Link to="/history" className="text-gray-600 hover:text-indigo-600">
              Riwayat
            </Link>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-800">Hai, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
