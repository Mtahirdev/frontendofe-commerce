import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { Add_Address } from "../../../server/server";
import { setUserData } from "../../../store/feature/UserData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddressForm = ({ toggleFun }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [loading, setloading] = useState();
  let { user, token } = useSelector((s) => s.userstore);
  let SubmitFun = async (e) => {
    setloading(true);
    let formdata = Object.fromEntries(new FormData(e.target));
    let res = await Add_Address(formdata, token);

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
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-2xl mx-auto p-5 sm:p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Add Address
        </h2>

        <Form onSubmit={SubmitFun} className="space-y-5">
          {/* Address Number */}
          <div>
            <label
              htmlFor="addressNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address Number
            </label>

            <input
              id="addressNumber"
              type="text"
              name="addressName"
              placeholder="Enter address number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>

            <textarea
              id="address"
              rows="3"
              name="address"
              placeholder="Enter your complete address"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:border-black focus:ring-2 focus:ring-gray-200"
            ></textarea>
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              City
            </label>

            <input
              id="city"
              type="text"
              name="city"
              placeholder="Enter city"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phoneNumber"
              placeholder="03XX XXXXXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition"
          >
            Save Address
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddressForm;
