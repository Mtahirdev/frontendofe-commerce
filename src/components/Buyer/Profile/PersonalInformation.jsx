import React from "react";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PersonalInformation = ({ toggleFun }) => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state.userstore);
  let dataA = [
    { value: user.username || "", heading: "Full Name" },
    { value: user.email || "", heading: "Email" },
    { value: user.userdata.profile.number || "", heading: "Phone Number" },
    {
      value: user.userdata.profile.dateofbirth || "",
      heading: "Date of Birth",
    },
  ];
  let dataB = [
    { value: user.userdata.profile.gender || "", heading: "Gender" },
    { value: user.userdata.profile.country || "", heading: "Country" },
    { value: user.userdata.profile.state || "", heading: "State/Province" },
    { value: user.userdata.profile.city || "", heading: "City" },
  ];
  return (
    <>
      <div className="w-[90%] mt-3 shadow-2xl shadow-gray-400 mb-6 pt-3 pb-3">
        <Form>
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
                      value={ele.value}
                      readOnly
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
                      value={ele.value}
                      readOnly
                      className="border border-gray-200 rounded-2xl w-[80%] pt-1 pb-1 pr-1 pl-1  "
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Form>
        <div className="w-full flex justify-center mt-3">
          <button
            onClick={() => toggleFun("edit information")}
            className="border-2 border-gray-200 rounded-2xl pb-1 pt-1 pl-2 pr-2"
          >
            Edit profile
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
