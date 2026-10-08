import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import TypeBanner from "../../assets/typebanner.avif";
import { TypeFetch } from "../../server/server";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setType,
  setUserData,
  setVerified,
} from "../../store/feature/UserData";
const Type = () => {
  let [loading, setloading] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // submit function
  let SubmitFun = async (params) => {
    try {
      setloading(true);
      let formdata = Object.fromEntries(new FormData(params.target));
      if (!formdata.type) {
        return toast.error("please select type");
      }
      let res = await TypeFetch(formdata);
      if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => {
          navigate("/auth/login");
        }, 4000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error(res.msg_signup);
        setTimeout(() => {
          navigate("/auth/signup");
        }, 4000);
      } else if (res.msg_verify) {
        setloading(false);
        toast.error(res.msg_verify);
        setTimeout(() => {
          navigate("/auth/otp");
        }, 4000);
      } else if (res.msg_success) {
        setloading(false);
        toast.success(res.msg_success);
        dispatch(setToken(res.accesstoken));
        dispatch(setType(res.user.type));
        dispatch(setVerified(res.user.verified));
        dispatch(setUserData(res.user));
        setTimeout(() => {
          navigate("/buyer");
        }, 4000);
      } else if (res.msg_alreadyset) {
        setloading(false);
        toast.error(res.msg_alreadyset);
        setTimeout(() => {
          navigate(`/${res.type}`);
        }, 4000);
      } else {
        setloading(false);
        toast.error("please try again later");
      }

      console.log(formdata);
    } catch (error) {
      console.log(error);

      setloading(false);
      toast.error("please try again later");
    }
  };
  return (
    <>
      {loading && (
        <>
          <div className="fixed z-50 w-full h-full inset-0 bg-black/50 flex justify-center items-center text-2xl md:text-3xl lg:text-4xl">
            <div className="grid grid-cols-2 w-10 h-10  animate-bounce">
              <div className="bg-blue-500 w-9 h-9 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="fixed z-50 w-full h-full inset-0 bg-black/50 flex justify-center items-center text-2xl md:text-3xl lg:text-4xl">
            <div className="grid grid-cols-2 w-10 h-10  animate-bounce">
              <div className="bg-green-500 w-9 h-9 rounded-full animate-pulse"></div>
            </div>
          </div>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div
        style={{ backgroundImage: `url(${TypeBanner})` }}
        className={`w-screen h-screen flex justify-center items-center text-center bg-no-repeat bg-cover bg-center`}
      >
        <div className="w-[85%] h-60 mb-30 z-50  rounded-2xl">
          <h1 className="capitalize text-center text-gray-600 mt-3 ">
            please select your type
          </h1>
          <div className="flex justify-center items-center text-center mt-3">
            {/* {true && <h1 className="text-red-500 sm:text-2xl">hello</h1>} */}
          </div>
          <div className="">
            <Form onSubmit={SubmitFun}>
              <div className="flex gap-4 justify-center mt-3">
                <input
                  type="radio"
                  className="mt-1.5"
                  name="type"
                  value="seller"
                  id="seller"
                />
                <label htmlFor="seller" className="capitalize text-2xl">
                  Become a seller
                </label>
              </div>
              <div className="flex gap-4 justify-center mt-3">
                <input
                  type="radio"
                  className="mt-1.5"
                  name="type"
                  value="buyer"
                  id="buyer"
                />
                <label htmlFor="buyer" className="capitalize text-2xl">
                  Become a buyer
                </label>
              </div>
              <button
                type="submit"
                className="mt-5  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Done
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Type;
