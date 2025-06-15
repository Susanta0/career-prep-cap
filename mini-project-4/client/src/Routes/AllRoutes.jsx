import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import Privet from "../privet/Privet";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <Privet>
              <Dashboard />
            </Privet>
          }
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
