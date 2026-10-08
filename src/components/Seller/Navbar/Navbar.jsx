import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AiFillProduct } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdBorderColor } from "react-icons/md";
import { CiDollar } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { IoHelp } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  let [open, setopen] = useState(false);
  let arr = [
    { icon: <AiFillProduct />, to: "/seller", name: "Products" },
    {
      icon: <IoIosAddCircleOutline />,
      to: "/seller/addproduct",
      name: "Add Product",
    },
    { icon: <MdBorderColor />, to: "/seller/order", name: "Orders" },
    { icon: <CiDollar />, to: "/seller/sales", name: "Sales" },
    { icon: <CgProfile />, to: "/seller/profile", name: "Profile" },

    { icon: <IoHelp />, to: "", name: "Help" },
    { icon: <CiChat1 />, to: "", name: "Chat with Admin" },
    // { icon: <IoIosNotifications />, to: "", name: "Notification" },
  ];
  return (
    <>
      {/* background */}
      {open && (
        <div className="w-full h-screen fixed inset-0 z-40 bg-black/50"></div>
      )}
      {/* background end */}
      <div className="w-full h-fit">
        {/* main nav */}
        <div className="w-full h-18 text-[#0B1730] bg-[#FFFFFF] shadow-sm border-b-[#E2E8F0] flex justify-between items-center lg:hidden">
          {/* img */}
          <h1 className="text-4xl ml-3 ">Shoppy</h1>
          {/* icon */}
          <div
            className="text-5xl mr-3"
            onClick={() => {
              setopen(true);
            }}
          >
            <IoMdMenu />
          </div>
        </div>
        {/* side bar */}
        {open && (
          <div className="w-[90%] h-screen fixed inset-0 z-50 bg-[#0B1730] border-r-[#E2E8F0] lg:hidden">
            <div className="w-full h-18  text-[#CBD5E1] shadow-sm border-b-[#E2E8F0] flex justify-between items-center">
              <h1 className="text-4xl ml-3 ">Shoppy</h1>
              {/* icon */}
              <div
                className="text-5xl mr-3 mt-1"
                onClick={() => setopen(false)}
              >
                <RxCross2 />
              </div>
            </div>
            {/* Links */}
            <div className="w-full h-fit mt-5 flex flex-col gap-8">
              {arr.map((ele, index) => {
                return (
                  <Link
                    to={ele.to}
                    key={index}
                    className="w-full h-fit flex gap-3 ml-3 items-center "
                  >
                    <div className="text-3xl text-gray-300">{ele.icon}</div>
                    <h1 className="text-2xl text-gray-300">{ele.name}</h1>
                  </Link>
                );
              })}
              <Link
                to="/seller/notification"
                className="w-full h-fit flex ml-3 gap-20  items-center "
              >
                <div className=" flex h-fit gap-3">
                  <div className="text-3xl text-gray-300">
                    <IoIosNotifications />
                  </div>
                  <h1 className="text-2xl text-gray-300">Notification</h1>
                </div>
                <div className="w-3 h-3 rounded-full bg-orange-400 mt-2 mr-3"></div>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* desktop */}
      <div className="w-[28%] desk:w-[22%] h-screen fixed  inset-0 z-50 bg-[#0B1730] border-r-[#E2E8F0] hidden lg:flex lg:flex-col lg:gap-3 lg:ml-3 lg:rounded-2xl">
        <div className="w-full h-18  text-[#CBD5E1] shadow-sm border-b-[#E2E8F0] flex justify-between items-center">
          <h1 className="text-4xl ml-3 ">Shoppy</h1>
          {/* icon */}
          {/* <div className="text-5xl mr-3 mt-1" onClick={() => setopen(false)}>
            <RxCross2 />
          </div> */}
        </div>
        {/* Links */}
        <div className="w-full h-fit mt-5 flex flex-col gap-8">
          {arr.map((ele, index) => {
            return (
              <Link
                to={ele.to}
                key={index}
                className="w-full h-fit flex gap-3 ml-3 items-center "
              >
                <div className="text-3xl text-gray-300">{ele.icon}</div>
                <h1 className="text-2xl text-gray-300">{ele.name}</h1>
              </Link>
            );
          })}
          <Link className="w-full h-fit flex ml-3 gap-20  items-center ">
            <div className=" flex h-fit gap-3">
              <div className="text-3xl text-gray-300">
                <IoIosNotifications />
              </div>
              <h1 className="text-2xl text-gray-300">Notification</h1>
            </div>
            <div className="w-3 h-3 rounded-full bg-orange-400 mt-2 mr-3"></div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
