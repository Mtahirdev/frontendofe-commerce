import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignupFetch } from "../../server/server.js";
import AuthLayout, {
  PasswordInput,
  SocialButtons,
  inputClass,
  labelClass,
} from "./AuthLayout.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const FormSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formdata = Object.fromEntries(new FormData(e.target));
      const res = await SignupFetch(formdata);

      if (res.msg_validation) {
        setloading(false);
        toast.error(res.msg_validation.msg);
      } else if (res.user_exist) {
        setloading(false);
        toast.error(res.user_exist);
        setTimeout(() => navigate("/auth/otp"), 3000);
      } else if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_user) {
        setloading(false);
        toast.success(res.msg_user);
        setTimeout(() => navigate("/auth/otp"), 2000);
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
      title="Welcome to Shoppy"
      subtitle="Sign up to create your account"
      loading={loading}
    >
      <Form onSubmit={FormSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username" className={labelClass}>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className={inputClass}
          />
        </div>

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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 active:scale-95 disabled:opacity-60"
        >
          Sign up
        </button>
      </Form>

      <SocialButtons />

      <p className="mt-6 text-center text-ink-500">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-brand-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
