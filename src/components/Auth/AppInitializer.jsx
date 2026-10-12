import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { GetmeFetch } from "../../server/server.js";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setOrderData,
  setToken,
  setType,
  setUserData,
  setVerified,
} from "../../store/feature/UserData.js";

const AppInitializer = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    try {
      GetmeFetch().then((res) => {
        console.log(res);

        if (res.msg_login) {
          setTimeout(() => {
            // navigate("/auth/login");
          }, 500);
        } else if (res.msg_signup) {
          setTimeout(() => {
            navigate("/auth/signup");
          }, 4000);
        } else if (res.msg_success) {
          dispatch(setToken(res.accesstoken));
          dispatch(setType(res.user.type));
          dispatch(setVerified(res.user.verified));
          dispatch(setUserData(res.user));
          dispatch(setOrderData(res.order));
          setTimeout(() => {
            navigate(`/${res.user.type}`);
          }, 500);
        } else {
        }
      });
    } catch (error) {
      navigate("");
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AppInitializer;
