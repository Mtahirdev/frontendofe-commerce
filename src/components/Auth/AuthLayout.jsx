import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import LoginImgMob from "../../assets/loginmob.png";

export const inputClass =
  "w-full px-4 py-2.5 bg-white border border-ink-200 rounded-xl text-ink-800 placeholder:text-ink-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
export const labelClass = "block text-sm font-medium text-ink-500 mb-1.5";

export const PasswordInput = ({ id = "password", name = "password" }) => {
  const [show, setshow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        id={id}
        required
        className={`${inputClass} pr-11`}
      />
      <button
        type="button"
        onClick={() => setshow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-3 text-xl text-ink-400 transition-colors hover:text-brand-600"
      >
        {show ? <IoMdEyeOff /> : <IoMdEye />}
      </button>
    </div>
  );
};

export const SocialButtons = () => (
  <>
    <div className="my-5 flex items-center gap-3 text-sm text-ink-400">
      <div className="h-px flex-1 bg-ink-200"></div>
      <span>or continue with</span>
      <div className="h-px flex-1 bg-ink-200"></div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => toast.info("Google login is not available yet")}
        className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-2.5 font-medium text-ink-700 transition-colors hover:bg-ink-50"
      >
        <FcGoogle className="text-2xl" /> Google
      </button>
      <button
        type="button"
        onClick={() => toast.info("Facebook login is not available yet")}
        className="flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-2.5 font-medium text-ink-700 transition-colors hover:bg-ink-50"
      >
        <FaFacebook className="text-2xl text-[#1877F2]" /> Facebook
      </button>
    </div>
  </>
);

const AuthLayout = ({ title, subtitle, loading, children }) => {
  return (
    <>
      {loading && (
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-ink-50 sm:flex">
        {/* image */}
        <div className="h-[70vw] sm:h-screen sm:w-1/2 sm:sticky sm:top-0">
          <img
            src={LoginImgMob}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* card */}
        <div className="relative -mt-8 flex min-h-[60vh] flex-col items-center rounded-t-[32px] bg-white px-6 py-8 shadow-2xl sm:mt-0 sm:min-h-screen sm:w-1/2 sm:justify-center sm:rounded-none sm:shadow-none">
          <div className="mb-4 h-1.5 w-14 rounded-full bg-ink-300 sm:hidden"></div>
          <h1 className="text-center text-2xl font-bold text-ink-800 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-center text-ink-500">{subtitle}</p>
          <div className="mt-6 w-full max-w-sm">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
