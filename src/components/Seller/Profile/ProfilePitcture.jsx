import React, { useState } from "react";
import { FaCameraRotate } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { SetProfilePitcture } from "../../../server/server.js";
import { toast } from "react-toastify";
import { setUserData } from "../../../store/feature/UserData";

const ProfilePitcture = () => {
  const { user, token } = useSelector((s) => s.userstore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [img, setimg] = useState(user.userdata.profile.img || "");
  const [picked, setpicked] = useState(false);

  const SetImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setimg(URL.createObjectURL(file));
    setpicked(true);
  };

  const SubmitFun = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formdata = new FormData(e.target);
      const res = await SetProfilePitcture(formdata, token);

      if (res.msg_login) {
        setloading(false);
        toast.error("please login");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error("please signup");
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msgerr) {
        setloading(false);
        toast.error("please try again later");
      } else if (res.msg_img) {
        setloading(false);
        toast.error("image is not found");
      } else if (res.msg_success) {
        setloading(false);
        setpicked(false);
        toast.success("profile picture updated");
        dispatch(setUserData(res.user));
      } else {
        setloading(false);
        toast.error("please try again later");
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

      <Form onSubmit={SubmitFun} className="w-[95%] max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white border border-ink-200 shadow-sm p-6 text-center sm:flex-row sm:text-left sm:gap-8">
          {/* picture */}
          <div className="relative shrink-0">
            {img ? (
              <img
                src={img}
                alt="profile"
                className="rounded-full w-36 h-36 md:w-44 md:h-44 object-cover bg-ink-100 border-4 border-brand-100"
              />
            ) : (
              <div className="flex items-center justify-center rounded-full w-36 h-36 md:w-44 md:h-44 bg-brand-50 border-4 border-brand-100 text-5xl font-bold text-brand-600 uppercase">
                {user.username?.charAt(0)}
              </div>
            )}
            <input
              type="file"
              id="file"
              name="img"
              accept="image/*"
              className="hidden"
              onChange={SetImage}
            />
            <label
              htmlFor="file"
              className="absolute bottom-1 right-1 flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-lg cursor-pointer shadow-md transition-colors"
            >
              <FaCameraRotate />
            </label>
          </div>

          {/* details + save */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <h2 className="font-bold text-xl sm:text-2xl text-ink-800">
              {user.username}
            </h2>
            <span className="inline-block w-fit rounded-full bg-brand-50 text-brand-600 px-3 py-0.5 text-sm font-semibold capitalize">
              {user.type}
            </span>
            <p className="text-ink-500">{user.email}</p>

            <button
              type="submit"
              disabled={!picked}
              className="mt-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 transition-colors"
            >
              Save Photo
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default ProfilePitcture;
