import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Privet = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Privet;
