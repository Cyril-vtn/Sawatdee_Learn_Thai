import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = UserAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  /* Utilisation d'effect pour surveiller les changements de l'état d'authentification */
  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  /* Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion */
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
