import React, { useState } from "react";
import { FaCameraRotate } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { SetProfilePitcture } from "../../../server/server.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { setUserData } from "../../../store/feature/UserData";
const ProfilePitcture = () => {
  let { user, token } = useSelector((s) => s.userstore);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  console.log(user.userdata.profile);
  let [loading, setloading] = useState(false);

  let [img, setimg] = useState(user.userdata.profile.img || "");
  let SetImage = (e) => {
    let a = e.target.files[0];
    a = URL.createObjectURL(a);
    setimg(a);
  };
  let SubmitFun = async (e) => {
    setloading(true);
    let formdata = new FormData(e.target);
    console.log(formdata);
    let res = await SetProfilePitcture(formdata, token);

    console.log(res);

    try {
      if (res.msg_login) {
        setloading(false);
        toast.error("please login");
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error("please signup");
        setTimeout(() => {
          navigate("/auth/signup");
        }, 3000);
      } else if (res.msgerr) {
        setloading(false);
        toast.error("please try again later");
      } else if (res.msg_img) {
        setloading(false);
        toast.error("image is not found");
      } else if (res.msg_success) {
        setloading(false);
        dispatch(setUserData(res.user));
        setTimeout(() => {
          navigate(`/${res.user.type}/profile`);
        }, 3000);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
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
      {/* main div */}
      <ToastContainer autoClose={3000} />
      <Form onSubmit={SubmitFun}>
        <div className="flex flex-col w-full  ">
          <div className="flex flex-col w-full sm:w-[50%] md:w-[50%] lg:w-[30%]  rounded-2xl  text-center justify-center sm:flex-row sm:gap-30 md:gap-40 sm:mx-auto sm:mt-5 mr-5 sm:pb-5   ">
            {/* pitcture div */}
            <div className="relative items-center justify-center text-center">
              <img
                src={img}
                alt=""
                className="rounded-full w-60  aspect-square  md:w-46 md:h-46  border-2 border-gray-300  mt-3 "
              />
              <button
                type="button"
                className="absolute left-[58%] mobile:left-[55%] sm:left-[95%] text-2xl bottom-0.5"
              >
                <input
                  type="file"
                  id="file"
                  name="img"
                  className="hidden"
                  onChange={(e) => {
                    SetImage(e);
                  }}
                />
                <label htmlFor="file">
                  <FaCameraRotate />
                </label>
              </button>
            </div>
            {/* content div */}
          </div>
          {/* edit button div */}
          <div className="w-full justify-center flex mt-2 sm:mt-8">
            <button
              type="submit"
              className="font-bold  pl-2 pr-2 pt-1 pb-1 border-2 rounded-2xl"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ProfilePitcture;
