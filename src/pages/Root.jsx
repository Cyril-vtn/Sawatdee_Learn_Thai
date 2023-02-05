import { Outlet } from "react-router-dom";
import Sidebar from "../components/UI/Sidebar";

function RootLayout() {
  return <>
  <Sidebar/>
  <Outlet />
  </>
}

export default RootLayout;
