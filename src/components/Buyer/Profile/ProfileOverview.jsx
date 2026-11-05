import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const ProfileOverview = () => {
  const { user } = useSelector((state) => state.userstore);

  const overview = [
    {
      text: "total orders",
      icon: <FaShoppingBag />,
      tone: "bg-brand-50 text-brand-600",
      value: user.userdata.profile.order,
    },
    {
      text: "total spending",
      icon: <FaShoppingBag />,
      tone: "bg-success-50 text-success-600",
      value: user.userdata.profile.spending_or_earning,
    },
    {
      text: "wishlist items",
      icon: <CiHeart />,
      tone: "bg-danger-50 text-danger-500",
      value: user.userdata.profile.cartitem,
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
      <h1 className="text-2xl text-center mt-8 font-bold text-ink-800">
        Account Overview
      </h1>
      <div className="w-[90%] lg:w-[70%] mx-auto mt-4 pb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {overview.map((ele, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl bg-white border border-ink-200 shadow-sm p-4"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-xl text-3xl ${ele.tone}`}
            >
              {ele.icon}
            </div>
            <div>
              <p className="text-sm capitalize text-ink-500">{ele.text}</p>
              <p className="text-xl font-bold capitalize text-ink-800">
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
