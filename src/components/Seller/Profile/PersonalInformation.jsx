import React from "react";
import { useSelector } from "react-redux";

const PersonalInformation = ({ toggleFun }) => {
  const { user } = useSelector((state) => state.userstore);
  const p = user.userdata?.profile || {};

  const fields = [
    { value: user.username, heading: "Full Name" },
    { value: user.email, heading: "Email" },
    { value: p.number, heading: "Phone Number" },
    { value: p.dateofbirth, heading: "Date of Birth" },
    { value: p.gender, heading: "Gender" },
    { value: p.country, heading: "Country" },
    { value: p.state, heading: "State/Province" },
    { value: p.city, heading: "City" },
  ];

  return (
    <div className="w-[95%] max-w-3xl mx-auto bg-white border border-ink-200 rounded-2xl shadow-sm p-5 mb-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((ele) => (
          <div key={ele.heading} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-ink-500">
              {ele.heading}
            </label>
            <input
              type="text"
              value={ele.value || ""}
              readOnly
              placeholder="Not added"
              className="w-full px-4 py-2.5 bg-ink-50 border border-ink-200 rounded-xl text-ink-800 placeholder:text-ink-400 cursor-default focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => toggleFun("edit information")}
          className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2 transition-colors"
        >
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
