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
import Profile from "./pages/profile/index";
import Settings from "./pages/account/index";

// * IMPORT DE LA PROTECTED ROUTE
import ProtectedRoute from "./setup/protectedRoutes/ProtectedRoute";

// * IMPORT DU ROOT LAYOUT
import RootLayout from "./pages/Root";

// * IMPORT DU CONTEXT
import { AuthContextProvider } from "./context/AuthContext";
import { PathContextProvider } from "./context/DataContext";

function App() {
  return (
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
            <Route path="profile/:userid" element={<Profile />} />
            <Route path="lessons/:lessonid" element={<Lessons />} />
            <Route path="settings/account" element={<Settings />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </PathContextProvider>
  );
}

export default App;
