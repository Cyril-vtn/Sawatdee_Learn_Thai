import React, { useContext } from "react";
import MainContent from "./components/MainContent";
import { useLessonsCtx } from "../../context/LessonsContext";
import { Navigate } from "react-router-dom";
const index = () => {
  const { id } = useLessonsCtx();

  //! A DECOMMENTER
  // if (!id) {
  //   return <Navigate to="/app/learn" />;
  // }

  return <MainContent />;
};

export default index;
