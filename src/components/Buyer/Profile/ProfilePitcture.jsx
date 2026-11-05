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
    let res = await SetProfilePitcture(formdata, token);

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
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}

      <ToastContainer autoClose={3000} />

      <Form onSubmit={SubmitFun} className="w-[90%] lg:w-[70%] mx-auto">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-white border border-ink-200 shadow-sm p-6 text-center sm:flex-row sm:text-left sm:gap-10">
          {/* picture */}
          <div className="relative shrink-0">
            <img
              src={img}
              alt="profile"
              className="rounded-full w-36 h-36 md:w-44 md:h-44 object-cover bg-ink-100 border-4 border-brand-100"
            />
            <input
              type="file"
              id="file"
              name="img"
              accept="image/*"
              className="hidden"
              onChange={(e) => SetImage(e)}
            />
            <label
              htmlFor="file"
              className="absolute bottom-1 right-1 flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-lg cursor-pointer shadow-md transition-colors"
            >
              <FaCameraRotate />
            </label>
          </div>

          {/* details */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl sm:text-2xl text-ink-800">
              {user.username}
            </h1>
            <span className="inline-block w-fit mx-auto sm:mx-0 rounded-full bg-brand-50 text-brand-600 px-3 py-0.5 text-sm font-semibold capitalize">
              {user.type}
            </span>
            <p className="text-ink-500 sm:text-lg">{user.email}</p>
          </div>
        </div>

        <div className="w-full flex justify-center mt-5">
          <button
            type="submit"
            className="font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 transition-colors"
          >
            Save Photo
          </button>
        </div>
      </Form>
    </>
  );
};

export default ProfilePitcture;
