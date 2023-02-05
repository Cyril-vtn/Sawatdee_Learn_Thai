import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/UI/Sidebar";
import { UserAuth } from "../context/AuthContext";

const Learn = () => {
  // Récupération des function du context (voir import si besoin)
  const { createUser, user } = UserAuth();

  return (
    <div>
      <div>
        <Sidebar>qhzd</Sidebar>
      </div>
    </div>
  );
};

export default Learn;
