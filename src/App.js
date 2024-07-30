import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/Login";
import OtpPage from "./pages/Otp";
import HomePage from "./pages/Home";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer theme="colored" rtl closeOnClick />

      <Router>
        <Routes>
          <Route path="/otp" element={<OtpPage />} />
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
          />
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
