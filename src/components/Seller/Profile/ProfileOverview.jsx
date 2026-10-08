import React, { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const ProfileOverview = () => {
  let { user } = useSelector((state) => state.userstore);
  let arr = [
    {
      text: "total order",
      icon: <FaShoppingBag className="text-5xl sm:text-7xl text-blue-600" />,
      value: user.userdata.profile.order,
      iconColor: "#1a4dd6",
      iconSize: "72",
    },
    {
      text: "total spending",
      icon: <FaShoppingBag className="text-5xl sm:text-7xl text-green-500" />,
      value: user.userdata.profile.spending_or_earning,
      iconColor: "#1a4dd6",
      iconSize: "72",
    },
    {
      text: "wishlist items",
      icon: <CiHeart className="text-5xl sm:text-7xl text-red-600" />,
      value: user.userdata.profile.cartitem,
      iconColor: "#1a4dd6",
      iconSize: "72",
    },
    {
      text: "account type",
      icon: <CgProfile className="text-5xl sm:text-7xl text-blue-500" />,
      value: user.type,
      iconColor: "#1a4dd6",
      iconSize: "72",
    },
  ];

  let [overview, setoverview] = useState(arr);
  return (
    <>
      <h1 className="text-2xl text-center mt-6 font-bold">Account Overview</h1>
      <div className="w-full mt-4 pb-5 ">
        <div className="w-[90%]  items-center flex flex-col justify-center gap-5 ml-[10%]">
          {overview.map((ele, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-evenly lg:w-[70%] shadow-2xl shadow-gray-200 "
              >
                <div className="flex w-[80%] gap-3 sm:gap-5 ">
                  <h1 className="">{ele.icon}</h1>
                  <h1 className="capitalize mt-4 sm:text-2xl sm:mt-6 ">
                    {ele.text}
                  </h1>
                </div>
                <div className="w-[20%]">
                  <h1 className="mt-4 sm:text-2xl sm:mt-6 capitalize font-bold">
                    {ele.value}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileOverview;
