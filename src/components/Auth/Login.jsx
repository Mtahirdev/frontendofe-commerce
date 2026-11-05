import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoginFetch } from "../../server/server";
import { useDispatch } from "react-redux";
import {
  setOrderData,
  setToken,
  setType,
  setUserData,
  setVerified,
} from "../../store/feature/UserData.js";
import AuthLayout, {
  PasswordInput,
  SocialButtons,
  inputClass,
  labelClass,
} from "./AuthLayout.jsx";

const Login = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SubmitFun = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formdata = Object.fromEntries(new FormData(e.target));
      const res = await LoginFetch(formdata);

      if (res.msg_validation) {
        setloading(false);
        toast.error(res.validation.msg);
      } else if (res.msg_password) {
        setloading(false);
        toast.error(res.msg_password);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error(res.msg_signup);
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msg_otp) {
        setloading(false);
        toast.error("verify your email, otp is sent to your email");
        setTimeout(() => navigate("/auth/otp"), 3000);
      } else if (res.msg_success) {
        setloading(false);
        toast.success("login successfully");
        dispatch(setToken(res.data.accesstoken));
        dispatch(setType(res.data.type));
        dispatch(setVerified(res.data.verified));
        dispatch(setUserData(res.user));
        dispatch(setOrderData(res.order));
        setTimeout(() => navigate(`/${res.data.type}`), 1500);
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
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your account"
      loading={loading}
    >
      <Form onSubmit={SubmitFun} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <PasswordInput />
          <button
            type="button"
            onClick={() => toast.info("Password reset is not available yet")}
            className="mt-1.5 block w-full text-right text-sm text-brand-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 active:scale-95 disabled:opacity-60"
        >
          Login
        </button>
      </Form>

      <SocialButtons />

      <p className="mt-6 text-center text-ink-500">
        Don't have an account?{" "}
        <Link
          to="/auth/signup"
          className="font-semibold text-brand-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
