import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, username, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          DSApp
        </Link>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-white">Hi, {username}!</span>
              <Link
                to="/contacts"
                className="bg-white text-blue-600 px-4 py-2 rounded shadow-md hover:bg-gray-100"
              >
                Contacts
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/login");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:underline transition duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
