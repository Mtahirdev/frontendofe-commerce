import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Set_Nav_Toggle_Buyer } from "../../../store/feature/NavToggleBuyer.js";
import { AiFillProduct } from "react-icons/ai";
import { IoIosAddCircleOutline, IoIosNotifications } from "react-icons/io";
import { MdBorderColor } from "react-icons/md";
import { CiChat1, CiDollar } from "react-icons/ci";
import { IoHelp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoBag } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";

const SideBar = () => {
  let arr = [
    { icon: <FaHome />, to: "/buyer", name: "Home" },
    {
      icon: <BiCategory />,
      to: "/buyer/category",
      name: "Category",
    },
    { icon: <MdBorderColor />, to: "/buyer/order", name: "Orders" },
    { icon: <FaShoppingCart />, to: "/buyer/cart", name: "Cart" },
    { icon: <CgProfile />, to: "/buyer/profile", name: "Profile" },
    { icon: <CiChat1 />, to: "", name: "Chat with Admin" },
    // { icon: <IoIosNotifications />, to: "", name: "Notification" },
  ];
  let { Nav_Toggle_Buyer } = useSelector((state) => state.navstore);
  console.log(Nav_Toggle_Buyer);

  let dispatch = useDispatch();
  return (
    <>
      {Nav_Toggle_Buyer && (
        <div>
          <div className="w-[90%] h-screen fixed inset-0 z-50 bg-[#0B1730] border-r-[#E2E8F0] lg:hidden">
            <div className="w-full h-18  text-[#CBD5E1] shadow-sm border-b-[#E2E8F0] flex justify-between items-center">
              <h1 className="text-4xl ml-3 ">Shoppy</h1>
              {/* icon */}
              <div
                className="text-5xl mr-3 mt-1"
                onClick={() => dispatch(Set_Nav_Toggle_Buyer())}
              >
                <RxCross2 />
              </div>
            </div>
            {/* Links */}
            <div className="w-full h-fit mt-5 flex flex-col gap-8">
              {arr.map((ele, index) => {
                return (
                  <Link
                    onClick={() => dispatch(Set_Nav_Toggle_Buyer())}
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
        </div>
      )}
    </>
  );
};

export default SideBar;
