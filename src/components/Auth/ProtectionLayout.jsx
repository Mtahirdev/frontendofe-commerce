import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectionLayout = ({ children }) => {
  let { type, token, verified } = useSelector((state) => state.userstore);
  let navigate = useNavigate();
  if (type == "auth") return <Navigate to="/auth/login" replace />;

  return <div>{children}</div>;
};

export default ProtectionLayout;
