import React from "react";
import LoginImgMob from "../../assets/loginmob.png";
import { Form, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignupFetch } from "../../server/server.js";
const Signup = () => {
  // Navigation state
  let navigate = useNavigate();

  // state for loading page
  let [loading, setloading] = useState(false);

  // Form submit Function
  let FormSubmit = async (e) => {
    setloading(true);
    try {
      let formdata = Object.fromEntries(new FormData(e.target));

      let res = await SignupFetch(formdata);

      console.log(res);

      if (res.msg_validation) {
        setloading(false);
        toast.error(res.msg_validation.msg);
      } else if (res.user_exist) {
        setloading(false);
        toast.error(res.user_exist);
        setTimeout(() => {
          navigate("/auth/otp");
        }, 4000);
      } else if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => {
          navigate("/auth/login");
        }, 4000);
      } else if (res.msg_user) {
        setloading(false);
        toast.success(res.msg_user);
        setTimeout(() => {
          navigate("/auth/otp");
        }, 4000);
      } else {
        setloading(false);
        toast.error("please try again later");
      }
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
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen sm:h-screen bg-slate-100 sm:flex ">
        <div className="h-[85vw] sm:h-full sm:w-[50%]">
          <img
            src={LoginImgMob}
            alt=""
            className="w-full h-full object-cover  "
          />
        </div>

        <div className="relative -mt-16  bg-white rounded-t-[40px] min-h-[60%] sm:h-full sm:mt-0 sm:w-[60%] shadow-2xl  flex-col flex items-center">
          <div className="w-16 h-2 rounded-full bg-gray-500 mt-4 "></div>
          <h1 className="text-center text-2xl font-bold w-full mt-3">
            Welcome to shoopy
          </h1>
          <p className="text-center w-full font-bold mt-1">
            Signup to create account
          </p>
          <Form className="flex flex-col pb-9 sm:pb-0 sm" onSubmit={FormSubmit}>
            <label htmlFor="username" className="text-2xl mt-2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-2 w-60 lg:w-80 pt-1 pb-1 rounded-[10px] border border-gray-400"
            />
            <label htmlFor="email" className="text-2xl mt-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-2 w-60 lg:w-80 pt-1 pb-1 rounded-[10px] border border-gray-400"
            />
            <label htmlFor="password" className="text-2xl mt-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-2 w-60 lg:w-80 pt-1 pb-1 rounded-[10px] border border-gray-400"
            />
            <Link className="text-right text-blue-600 mt-1">
              Forget password?
            </Link>
            <button
              type="submit"
              className="mt-2 w-60 lg:w-80 pt-1 pb-1 rounded-[10px] border border-gray-400 bg-blue-500 text-white hover:scale-115 active:scale-80"
            >
              Signup
            </button>
            <div className="flex gap-1 w-full mt-2 items-center justify-center">
              <div className="w-[20%] rounded-full h-0.5 bg-gray-500"></div>
              <div>or continue with</div>
              <div className="w-[20%] rounded-full h-0.5 bg-gray-500"></div>
            </div>
            <div className="flex flex-col w-full text-center justify-center items-center gap-3">
              <button className="flex items-center justify-center  mt-2 w-60 pt-1 pb-1 rounded-[10px] border border-gray-400 gap-3  ">
                <div>Google</div>
                <div>
                  <FcGoogle className="text-2xl" />
                </div>
              </button>
              <button className="flex items-center justify-center  mt-2 w-60 pt-1 pb-1 rounded-[10px] border border-gray-400 gap-3  ">
                <div>Facebook</div>
                <div>
                  <img
                    src="https://cdn.simpleicons.org/facebook/1877F2"
                    className="w-6 h-6"
                  />
                </div>
              </button>
            </div>
            <h1 className="flex items-center w-full text-blue-600 mt-1 ml-2 justify-center">
              <Link>Don't have an account? Signup</Link>
            </h1>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;

// technologies used in web developmet
// types of website
// types of databbases
//
