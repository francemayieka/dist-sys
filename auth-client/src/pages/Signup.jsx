import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } else {
      toast.error("Signup failed. Try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="block w-full mb-4 p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="block w-full mb-4 p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
