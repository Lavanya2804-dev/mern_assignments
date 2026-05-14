import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-400">
        GitHub Clone
      </h1>

      <div className="flex gap-4 items-center">
        <Link to="/">Dashboard</Link>

        <Link to="/notifications">
          Notifications
        </Link>

        <Link to="/activity">
  Activity
</Link>

        <Link to="/profile">
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;