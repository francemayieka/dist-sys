// src/pages/Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <h1 className="text-4xl font-bold">Welcome to Distributed Systems</h1>
    </div>
  );
};

export default Home;
