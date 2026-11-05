import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FaStore, FaShoppingBag } from "react-icons/fa";
import TypeBanner from "../../assets/typebanner.avif";
import { TypeFetch } from "../../server/server";
import { useDispatch } from "react-redux";
import {
  setToken,
  setType,
  setUserData,
  setVerified,
} from "../../store/feature/UserData";

const options = [
  {
    value: "buyer",
    title: "I want to buy",
    text: "Browse products and place orders",
    icon: <FaShoppingBag />,
  },
  {
    value: "seller",
    title: "I want to sell",
    text: "List products and manage orders",
    icon: <FaStore />,
  },
];

const Type = () => {
  const [loading, setloading] = useState(false);
  const [selected, setselected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SubmitFun = async (e) => {
    e.preventDefault();
    if (!selected) return toast.error("please select type");

    setloading(true);
    try {
      const res = await TypeFetch({ type: selected });

      if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error(res.msg_signup);
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msg_verify) {
        setloading(false);
        toast.error(res.msg_verify);
        setTimeout(() => navigate("/auth/otp"), 3000);
      } else if (res.msg_success) {
        setloading(false);
        toast.success(res.msg_success);
        dispatch(setToken(res.accesstoken));
        dispatch(setType(res.user.type));
        dispatch(setVerified(res.user.verified));
        dispatch(setUserData(res.user));
        setTimeout(() => navigate(`/${res.user.type}`), 1500);
      } else if (res.msg_alreadyset) {
        setloading(false);
        toast.error(res.msg_alreadyset);
        setTimeout(() => navigate(`/${res.type}`), 3000);
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

      <div
        style={{ backgroundImage: `url(${TypeBanner})` }}
        className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      >
        <div className="absolute inset-0 bg-ink-900/60"></div>

        <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          <h1 className="text-center text-2xl font-bold text-ink-800">
            How will you use Shoppy?
          </h1>
          <p className="mt-1 text-center text-ink-500">
            Please select your account type
          </p>

          <Form onSubmit={SubmitFun} className="mt-6 flex flex-col gap-3">
            {options.map((o) => {
              const active = selected === o.value;
              return (
                <label
                  key={o.value}
                  htmlFor={o.value}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${
                    active
                      ? "border-brand-600 bg-brand-50"
                      : "border-ink-200 bg-white hover:border-brand-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={o.value}
                    id={o.value}
                    checked={active}
                    onChange={() => setselected(o.value)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${
                      active
                        ? "bg-brand-600 text-white"
                        : "bg-ink-100 text-ink-500"
                    }`}
                  >
                    {o.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-ink-800">
                      {o.title}
                    </span>
                    <span className="block text-sm text-ink-500">{o.text}</span>
                  </span>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      active ? "border-brand-600" : "border-ink-300"
                    }`}
                  >
                    {active && (
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-600"></span>
                    )}
                  </span>
                </label>
              );
            })}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition hover:bg-brand-700 active:scale-95 disabled:opacity-60"
            >
              Continue
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Type;
