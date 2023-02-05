import React from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  return <HomePage />;
};

export default Home;

// backgroundColor: props.backgroundColor,
// borderBottom: props.borderBottom,
// borderBottomWidth: props.borderBottomWidth,
// padding: props.padding,
// color: props.color,
