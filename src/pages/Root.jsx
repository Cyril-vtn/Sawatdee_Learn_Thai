import { Outlet } from "react-router-dom";
import Sidebar from "../pages/learn/components/Sidebar";
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
