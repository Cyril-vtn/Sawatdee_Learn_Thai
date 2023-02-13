import { createBrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./setup/protectedRoutes/ProtectedRoute";
import Home from "./pages/main/index";
import Learn from "./pages/learn/index";
import Alphabet from "./pages/alphabet/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import RootLayout from "./pages/Root";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const THEME = createTheme({
  typography: {
    fontFamily: `"DINROUNDPRO", "Helvetica", "Arial", sans-serif`,
    fontSize: 16,
    fontWeightLight: 700,
    fontWeightRegular: 700,
    fontWeightMedium: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <RootLayout />
              </ProtectedRoute>
            }
          >
            <Route path="learn" element={<Learn />} />
            <Route path="alphabet" element={<Alphabet />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
