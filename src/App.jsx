import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RootLayout from "./pages/Root";


// Crée les différentes routes pour le site
const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "learn",
        element: (
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        ),
        children: [
          {
           index: true,
           element:  <Learn/>,
          }
        ]
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
