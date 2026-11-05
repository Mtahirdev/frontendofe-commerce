import React from "react";
import { FaShoppingBag, FaMoneyBillWave } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const ProfileOverview = () => {
  const { user } = useSelector((state) => state.userstore);
  const profile = user.userdata.profile;

  const overview = [
    {
      text: "total orders",
      icon: <FaShoppingBag />,
      tone: "bg-brand-50 text-brand-600",
      value: profile.order,
    },
    {
      text: "total earning",
      icon: <FaMoneyBillWave />,
      tone: "bg-success-50 text-success-600",
      value: profile.spending_or_earning,
    },
    {
      text: "account type",
      icon: <CgProfile />,
      tone: "bg-accent-50 text-accent-600",
      value: user.type,
    },
  ];

  return (
    <>
      <h2 className="text-2xl text-center mt-8 font-bold text-ink-800">
        Account Overview
      </h2>
      <div className="w-[95%] max-w-3xl mx-auto mt-4 pb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {overview.map((ele) => (
          <div
            key={ele.text}
            className="flex items-center gap-4 rounded-2xl bg-white border border-ink-200 shadow-sm p-4"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 shrink-0 rounded-xl text-3xl ${ele.tone}`}
            >
              {ele.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm capitalize text-ink-500">{ele.text}</p>
              <p className="text-xl font-bold capitalize text-ink-800 truncate">
                {ele.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfileOverview;
