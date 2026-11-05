import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook } from "react-icons/fa6";
import { useSelector } from "react-redux";
import PersonalInformation from "./PersonalInformation.jsx";
import AddressesInformation from "./AddressesInformation.jsx";
import PersonalInformationEdit from "./PersonalInformationEdit.jsx";
import AddressForm from "./AddressForm.jsx";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../../server/server.js";

const ProfileInformation = () => {
  const [toggle, settoggle] = useState("information");
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.userstore);

  const LogoutFun = async () => {
    Logout(token).then(() => {
      alert("Logout successfully");
      navigate("/auth");
    });
  };

  const toggleFun = (state) => settoggle(state);

  // the old code used the misspelled "edit informaion"; both spellings work here
  const editing = toggle === "edit information" || toggle === "edit informaion";
  const infoActive = toggle === "information" || editing;
  const addrActive = toggle === "addresses" || toggle === "add address";

  const tabClass = (active) =>
    `flex flex-1 flex-col items-center gap-1 py-3 border-b-2 transition-colors ${
      active
        ? "border-brand-600 text-brand-600 font-semibold"
        : "border-transparent text-ink-500 hover:bg-ink-50 hover:text-brand-600"
    }`;

  return (
    <>
      {/* tabs */}
      <div className="w-[95%] max-w-3xl mx-auto mt-4 rounded-2xl bg-white border border-ink-200 shadow-sm overflow-hidden">
        <div className="flex">
          <button
            onClick={() => toggleFun("information")}
            className={tabClass(infoActive)}
          >
            <CgProfile className="text-2xl" />
            <p>Personal information</p>
          </button>
          <button
            onClick={() => toggleFun("addresses")}
            className={tabClass(addrActive)}
          >
            <FaAddressBook className="text-2xl" />
            <p>Warehouse addresses</p>
          </button>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col items-center w-full mt-4">
        {toggle === "information" && (
          <PersonalInformation toggleFun={toggleFun} />
        )}
        {toggle === "addresses" && (
          <AddressesInformation toggleFun={toggleFun} />
        )}
        {editing && <PersonalInformationEdit toggleFun={toggleFun} />}
        {toggle === "add address" && <AddressForm toggleFun={toggleFun} />}

        <button
          onClick={LogoutFun}
          className="mt-6 mb-6 rounded-xl border-2 border-danger-500 text-danger-600 hover:bg-danger-500 hover:text-white font-semibold px-8 py-2 transition-colors"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfileInformation;
