import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./setup/protectedRoutes/ProtectedRoute";
import Home from "./pages/main/index";
import Learn from "./pages/learn/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import RootLayout from "./pages/Root";

// Crée les différentes routes pour le site
const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
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
            element: <Learn />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
