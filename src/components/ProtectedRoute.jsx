import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { IsloagedIn } = UserAuth();

  /* Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion */
  if (!IsloagedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
