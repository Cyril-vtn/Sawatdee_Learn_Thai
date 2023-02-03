import React from "react";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";

const Learn = () => {
  // Récupération des function du context (voir import si besoin)
  const { createUser, user } = UserAuth();

  return (
    <div>
      <div>
        <Navbar />
        <div>{user.email}</div>
      </div>
    </div>
  );
};

export default Learn;
