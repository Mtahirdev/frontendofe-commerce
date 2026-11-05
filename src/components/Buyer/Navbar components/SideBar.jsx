import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Set_Nav_Toggle_Buyer } from "../../../store/feature/NavToggleBuyer.js";
import { IoIosNotifications } from "react-icons/io";
import { MdBorderColor } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const SideBar = () => {
  const arr = [
    { icon: <FaHome />, to: "/buyer", name: "Home" },
    { icon: <BiCategory />, to: "/buyer/category", name: "Category" },
    { icon: <MdBorderColor />, to: "/buyer/order", name: "Orders" },
    { icon: <FaShoppingCart />, to: "/buyer/cart", name: "Cart" },
    { icon: <CgProfile />, to: "/buyer/profile", name: "Profile" },
    { icon: <CiChat1 />, to: "", name: "Chat with Admin" },
  ];
  const { Nav_Toggle_Buyer } = useSelector((state) => state.navstore);
  const dispatch = useDispatch();
  const close = () => dispatch(Set_Nav_Toggle_Buyer());

  if (!Nav_Toggle_Buyer) return null;

  const itemClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-ink-300 hover:bg-ink-800 hover:text-white transition-colors";

  return (
    <div className="w-[85%] h-screen fixed inset-0 z-50 bg-ink-900 shadow-2xl lg:hidden">
      <div className="w-full h-16 flex justify-between items-center px-4 border-b border-ink-800">
        <h1 className="text-3xl font-bold text-white">Shoppy</h1>
        <button
          className="text-3xl text-ink-300 hover:text-white"
          onClick={close}
        >
          <RxCross2 />
        </button>
      </div>

      <div className="mt-5 px-2 flex flex-col gap-1">
        {arr.map((ele, index) => (
          <Link key={index} to={ele.to} onClick={close} className={itemClass}>
            <span className="text-2xl">{ele.icon}</span>
            <span className="text-lg">{ele.name}</span>
          </Link>
        ))}

        <Link
          to="/buyer/notification"
          onClick={close}
          className={`${itemClass} justify-between`}
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">
              <IoIosNotifications />
            </span>
            <span className="text-lg">Notification</span>
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
