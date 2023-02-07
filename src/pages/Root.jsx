import { Outlet } from "react-router-dom";
import Sidebar from "../pages/learn/components/Sidebar";

function RootLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default RootLayout;
