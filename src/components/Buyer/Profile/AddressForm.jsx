import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { Add_Address } from "../../../server/server";
import { setUserData } from "../../../store/feature/UserData";
import { toast } from "react-toastify";

const inputClass =
  "w-full px-4 py-3 bg-white border border-ink-200 rounded-xl text-ink-800 placeholder:text-ink-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelClass = "block text-sm font-medium text-ink-500 mb-2";

const AddressForm = ({ toggleFun }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { token } = useSelector((s) => s.userstore);

  const SubmitFun = async (e) => {
    e.preventDefault();
    setloading(true);
    const formdata = Object.fromEntries(new FormData(e.target));
    const res = await Add_Address(formdata, token);

    try {
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
      } else if (res.msg_validation) {
        setloading(false);
        toast.error(res.validation.msg);
      } else if (res.msg) {
        setloading(false);
        toast.success("Address add successfully");
        dispatch(setUserData(res.user));
        toggleFun("addresses");
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

      <div className="w-[95%] max-w-2xl mx-auto p-5 sm:p-6 bg-white border border-ink-200 rounded-2xl shadow-sm mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink-800 mb-6">
          Add Address
        </h2>

        <Form onSubmit={SubmitFun} className="space-y-5">
          <div>
            <label htmlFor="addressName" className={labelClass}>
              Address Name
            </label>
            <input
              id="addressName"
              type="text"
              name="addressName"
              placeholder="Home, Office..."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <textarea
              id="address"
              rows="3"
              name="address"
              placeholder="Enter your complete address"
              className={`${inputClass} resize-none`}
            ></textarea>
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="Enter city"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phoneNumber"
              placeholder="03XX XXXXXXX"
              className={inputClass}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => toggleFun("addresses")}
              className="w-1/3 py-3 rounded-xl border border-ink-200 text-ink-700 font-medium hover:bg-ink-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 active:scale-95 transition"
            >
              Save Address
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddressForm;
