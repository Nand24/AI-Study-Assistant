import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from '../utils/auth'

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isAuthenticated();
      setAuth(valid);
    };
    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>; // or spinner
  if (!auth) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
