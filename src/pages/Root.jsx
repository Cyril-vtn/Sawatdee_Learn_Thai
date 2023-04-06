import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import React from "react";
function RootLayout() {
  return (
    <>
      <Sidebar />
      <div className="root">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
