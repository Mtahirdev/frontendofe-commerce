import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { EditProfile } from "../../../server/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { setUserData } from "../../../store/feature/UserData";

const PersonalInformationEdit = ({ toggleFun }) => {
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  let { user, token } = useSelector((state) => state.userstore);
  let dataA = [
    {
      value: user.username || "",
      heading: "Full Name",
      nameoffield: "username",
    },
    { value: user.email || "", heading: "Email", nameoffield: "email" },
    {
      value: user.userdata.profile.number || "",
      heading: "Phone Number",
      nameoffield: "number",
    },
    {
      value: user.userdata.profile.dateofbirth || "",
      heading: "Date of Birth",
      nameoffield: "dateofbirth",
    },
  ];
  let dataB = [
    {
      value: user.userdata.profile.gender || "",
      heading: "Gender",
      nameoffield: "gender",
    },
    {
      value: user.userdata.profile.country || "",
      heading: "Country",
      nameoffield: "country",
    },
    {
      value: user.userdata.profile.state || "",
      heading: "State/Province",
      nameoffield: "state",
    },
    {
      value: user.userdata.profile.city || "",
      heading: "City",
      nameoffield: "city",
    },
  ];
  let SubmitFun = async (e) => {
    toggleFun("information");

    setloading(true);
    let formdata = Object.fromEntries(new FormData(e.target));
    console.log(formdata);
    let res = await EditProfile(formdata, token);
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
        toast.success("Profile update successfully");
        dispatch(setUserData(res.user));
        setTimeout(() => {
          navigate(`/${res.user.type}/profile`);
        }, 3000);
      } else {
        setloading(false);
        toast.error("some error occur");
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
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-[90%] mt-3 shadow-2xl shadow-gray-400 mb-6 pt-3 pb-3">
        <h1 className="font-bold text-2xl sm:ml-6 sm:mb-3 ml-2">
          Please Edit Your Profile
        </h1>
        <Form onSubmit={SubmitFun}>
          <div className="lg:flex lg:justify-evenly lg:w-full">
            <div className="lg:w-[35%]">
              {dataA.map((ele, index) => {
                return (
                  <div
                    className="flex flex-col ml-3 gap-1 mt-1 w-full"
                    key={index}
                  >
                    <label htmlFor="">{ele.heading}</label>
                    <input
                      type="text"
                      defaultValue={ele.value}
                      name={ele.nameoffield}
                      className="border border-gray-200 rounded-2xl w-[80%] pt-1 pb-1 pr-1 pl-1 "
                    />
                  </div>
                );
              })}
            </div>
            <div className="lg:w-[35%]">
              {dataB.map((ele, index) => {
                return (
                  <div
                    className="flex flex-col ml-3 gap-1 mt-1 w-full"
                    key={index}
                  >
                    <label htmlFor="">{ele.heading}</label>
                    <input
                      type="text"
                      defaultValue={ele.value}
                      name={ele.nameoffield}
                      className="border border-gray-200 rounded-2xl w-[80%] pt-1 pb-1 pr-1 pl-1  "
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-center mt-3">
            <button
              type="submit"
              className="border-2 border-gray-200 rounded-2xl pb-1 pt-1 pl-2 pr-2"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PersonalInformationEdit;
