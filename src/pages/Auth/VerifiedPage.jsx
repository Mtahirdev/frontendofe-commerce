import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { RequestOtpFetch } from "../../server/server.js";

const COOLDOWN = 60;

const VerifiedPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userstore);
  const [loading, setloading] = useState(false);
  const [countdown, setcountdown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const startCountdown = () => {
    clearInterval(timerRef.current);
    setcountdown(COOLDOWN);
    timerRef.current = setInterval(() => {
      setcountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    if (countdown > 0 || loading) return;
    setloading(true);
    try {
      const res = await RequestOtpFetch();

      if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_already) {
        setloading(false);
        toast.success(res.msg_already);
        setTimeout(() => navigate("/auth/type"), 2000);
      } else if (res.msg_success) {
        setloading(false);
        toast.success(res.msg_success);
        startCountdown();
        setTimeout(() => navigate("/auth/otp"), 1500);
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

      <div className="flex min-h-screen w-full items-center justify-center bg-ink-50 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-sm sm:p-10">
          {/* icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-5xl text-brand-600 sm:h-24 sm:w-24 sm:text-6xl">
            <MdOutlineMarkEmailRead />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-ink-800 sm:text-3xl">
            Verify your account
          </h1>
          <p className="mt-2 text-ink-500">
            Please verify your account first to continue using Shoppy.
          </p>

          {user?.email && (
            <p className="mt-4 break-all rounded-xl bg-ink-50 px-4 py-2.5 text-sm text-ink-700">
              We will send the code to{" "}
              <span className="font-semibold text-ink-800">{user.email}</span>
            </p>
          )}

          {/* steps */}
          <ol className="mt-6 space-y-3 text-left text-sm text-ink-500">
            {[
              "Click the Send OTP button below",
              "Check your email for the code",
              "Enter the code to verify your account",
            ].map((text, i) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                  {i + 1}
                </span>
                {text}
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={sendOtp}
            disabled={loading || countdown > 0}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
            )}
            {loading
              ? "Sending..."
              : countdown > 0
                ? `Send again in ${countdown}s`
                : "Send OTP"}
          </button>

          <Link
            to="/auth/otp"
            className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline"
          >
            I already have a code
          </Link>

          <p className="mt-6 text-sm text-ink-500">
            Wrong account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-brand-600 hover:underline"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifiedPage;
