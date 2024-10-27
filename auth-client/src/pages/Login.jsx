import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setLoggedIn({ username: data.username });
      navigate("/");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="block w-full mb-4 p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-4 p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-600 underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/signup" className="text-blue-600 underline">
            Don’t have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
