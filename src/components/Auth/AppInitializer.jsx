import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { GetmeFetch } from "../../server/server.js";
import SocketListener from "../../hooks/SocketListner.jsx";
import {
  setOrderData,
  setToken,
  setType,
  setUserData,
  setVerified,
} from "../../store/feature/UserData.js";

const AppInitializer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    GetmeFetch()
      .then((res) => {
        if (res.msg_login) {
          setTimeout(() => navigate("/auth/home"), 500);
        } else if (res.msg_signup) {
          setTimeout(() => navigate("/auth/home"), 500);
        } else if (res.msg_success) {
          dispatch(setToken(res.accesstoken));
          dispatch(setType(res.user.type));
          dispatch(setVerified(res.user.verified));
          dispatch(setUserData(res.user));
          dispatch(setOrderData(res.order));
          setTimeout(() => navigate(`/${res.user.type}`), 500);
        } else if (res.msg_not_verified) {
          dispatch(setVerified(res.user.verified));
          dispatch(setType(res.user.type));
          setTimeout(() => navigate("/auth/verfiyaccount"), 1000);
        }
      })
      .catch(() => navigate("/auth/login"));
  }, []);

  return (
    <>
      <SocketListener />
      <ToastContainer position="top-right" autoClose={4000} />
      <Outlet />
    </>
  );
};

export default AppInitializer;
