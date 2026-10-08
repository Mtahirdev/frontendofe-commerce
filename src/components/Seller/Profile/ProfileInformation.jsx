import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import PersonalInformation from "./PersonalInformation.jsx";
import AddressesInformation from "./AddressesInformation.jsx";
import PersonalInformationEdit from "./PersonalInformationEdit.jsx";
import AddressForm from "./AddressForm.jsx";

const ProfileInformation = () => {
  let [toggle, settoggle] = useState("information");

  let toggleFun = (state) => {
    settoggle(state);
  };
  return (
    <>
      <div className="w-full flex  justify-center">
        <div className="w-[95%] h-fit shadow-2xl shadow-gray-300 mt-4 pb-4 flex flex-col justify-center mb-6 pt-5 ">
          <div className="flex justify-evenly   ">
            <div
              onClick={() => toggleFun("information")}
              className={`flex flex-col items-center hover:bg-gray-200 pb-2 pt-2 pl-1 pr-1 ${toggle == "information" ? "border-b-2" : ""}`}
            >
              <CgProfile className="text-2xl" />
              <p>Persoanl information</p>
            </div>
            <div
              onClick={() => toggleFun("addresses")}
              className={`flex flex-col items-center pb-2 pt-2 pl-1 pr-1 hover:bg-gray-200 ${toggle == "addresses" ? "border-b-2" : ""}`}
            >
              <FaAddressBook className="text-2xl" />
              <p>Addresses of WareHouse</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full h-fit">
        <div
          className={`${toggle == "edit informaion" || toggle == "add address" ? "hidden" : ""} w-full h-full items-center flex flex-col`}
        >
          {toggle == "information" ? (
            <PersonalInformation toggleFun={toggleFun}></PersonalInformation>
          ) : (
            <AddressesInformation toggleFun={toggleFun}></AddressesInformation>
          )}
        </div>
        <div
          className={`${toggle === "edit informaion" || "add address" ? "" : ""}  w-full h-full items-center flex-col flex`}
        >
          {toggle == "edit informaion" ? (
            <PersonalInformationEdit toggleFun={toggleFun} />
          ) : (
            ""
          )}
          {toggle == "add address" ? <AddressForm toggleFun={toggleFun} /> : ""}
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
