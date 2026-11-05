import React, { useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { OtpFetch, RequestOtpFetch } from "../../server/server.js";

const LENGTH = 4;

const Otpcomponent = () => {
  const [otp, setotp] = useState(new Array(LENGTH).fill(""));
  const [loading, setloading] = useState(false);
  const [countdown, setcountdown] = useState(0);
  const navigate = useNavigate();
  const refs = useRef([]);
  const timerRef = useRef(null);

  const startCountdown = (seconds) => {
    clearInterval(timerRef.current);
    setcountdown(seconds);
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

  useEffect(() => {
    startCountdown(2); // seconds before "Resend" unlocks on first load
    return () => clearInterval(timerRef.current);
  }, []);

  const handle_change = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newotp = [...otp];
    newotp[index] = value;
    setotp(newotp);
    if (value && index < LENGTH - 1) refs.current[index + 1]?.focus();
  };

  const handle_keydown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handle_paste = (e) => {
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH);
    if (!digits) return;
    e.preventDefault();
    const next = new Array(LENGTH).fill("");
    digits.split("").forEach((d, i) => (next[i] = d));
    setotp(next);
    refs.current[Math.min(digits.length, LENGTH - 1)]?.focus();
  };

  const handle_resend = async () => {
    if (countdown > 0) {
      toast.error(`please wait ${countdown}sec`);
      return;
    }
    startCountdown(60);
    setloading(true);
    try {
      const res = await RequestOtpFetch();

      if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_already) {
        setloading(false);
        toast.error(res.msg_already);
        setTimeout(() => navigate("/auth/type"), 3000);
      } else if (res.msg_success) {
        setloading(false);
        toast.success(res.msg_success);
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

  const OtpSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < LENGTH) {
      toast.error(`please enter the ${LENGTH} digit code`);
      return;
    }

    setloading(true);
    try {
      const res = await OtpFetch({ otp: code });

      if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_otperr) {
        setloading(false);
        toast.error(res.msg_otperr);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error(res.msg_signup);
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msg_already) {
        setloading(false);
        toast.error(res.msg_already);
        setTimeout(() => navigate("/auth/type"), 3000);
      } else if (res.msg_otpincorrect) {
        setloading(false);
        toast.error(res.msg_otpincorrect);
      } else if (res.msg_otpexpired) {
        setloading(false);
        toast.error(res.msg_otpexpired);
      } else if (res.msg_success) {
        setloading(false);
        toast.success(res.msg_success);
        setTimeout(() => navigate("/auth/type"), 1500);
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
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex min-h-screen w-full items-center justify-center bg-ink-50 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-ink-800">Enter OTP</h1>
          <p className="mt-1 text-sm text-ink-500">
            We sent a {LENGTH} digit code to your email
          </p>

          <Form
            onSubmit={OtpSubmit}
            className="mt-6 flex flex-col items-center"
          >
            <div className="flex gap-3" onPaste={handle_paste}>
              {otp.map((ele, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoFocus={index === 0}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  maxLength="1"
                  value={ele}
                  onChange={(e) => handle_change(e.target.value, index)}
                  onKeyDown={(e) => handle_keydown(e, index)}
                  className="h-14 w-12 rounded-xl border-2 border-ink-200 bg-white text-center text-xl font-semibold text-ink-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 active:scale-95 disabled:opacity-60"
            >
              Verify
            </button>
          </Form>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm">
            <span className="text-ink-500">Didn't get the code?</span>
            <button
              type="button"
              onClick={handle_resend}
              disabled={countdown > 0}
              className="font-semibold text-brand-600 hover:underline disabled:cursor-not-allowed disabled:text-ink-400 disabled:no-underline"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otpcomponent;
