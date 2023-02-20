import React from "react";

// * IMPORT DE REACT ROUTER DOM
import { Route, Routes } from "react-router-dom";

// * IMPORT DES PAGES
import Home from "./pages/main/index";
import Learn from "./pages/learn/index";
import Alphabet from "./pages/alphabet/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import Lessons from "./pages/lessons/index";

// * IMPORT DE LA PROTECTED ROUTE
import ProtectedRoute from "./setup/protectedRoutes/ProtectedRoute";

// * IMPORT DU ROOT LAYOUT
import RootLayout from "./pages/Root";

// * IMPORT DU THEME
import { ThemeProvider, createTheme } from "@mui/material/styles";

// * IMPORT DU CONTEXT
import { AuthContextProvider } from "./context/AuthContext";
import { PathContextProvider } from "./context/DataContext";
import { LessonsContextProvider } from "./context/LessonsContext";

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
      <LessonsContextProvider>
        <PathContextProvider>
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
              <Route
                path="lessons"
                element={
                  <ProtectedRoute>
                    <Lessons />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthContextProvider>
        </PathContextProvider>
      </LessonsContextProvider>
    </ThemeProvider>
  );
}

export default App;
