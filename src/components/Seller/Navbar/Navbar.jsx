import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AiFillProduct } from "react-icons/ai";
import { IoIosAddCircleOutline, IoIosNotifications } from "react-icons/io";
import { MdBorderColor } from "react-icons/md";
import { CiDollar, CiChat1 } from "react-icons/ci";
import { IoHelp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const links = [
  { icon: <AiFillProduct />, to: "/seller", name: "Products", end: true },
  {
    icon: <IoIosAddCircleOutline />,
    to: "/seller/addproduct",
    name: "Add Product",
  },
  { icon: <MdBorderColor />, to: "/seller/order", name: "Orders" },
  { icon: <CiDollar />, to: "/seller/sales", name: "Sales" },
  { icon: <CgProfile />, to: "/seller/profile", name: "Profile" },
  { icon: <IoHelp />, to: "/seller/help", name: "Help" },
  { icon: <CiChat1 />, to: "/seller/chat", name: "Chat with Admin" },
  {
    icon: <IoIosNotifications />,
    to: "/seller/notification",
    name: "Notification",
    dot: true,
  },
];

const baseItem =
  "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors";

const SidebarLinks = ({ onNavigate }) => (
  <nav className="flex flex-col gap-1 px-3 mt-4">
    {links.map((ele) => {
      const content = (
        <>
          <span className="text-2xl">{ele.icon}</span>
          <span className="text-lg flex-1">{ele.name}</span>
          {ele.dot && (
            <span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span>
          )}
        </>
      );

      // items without a page yet (Help, Chat) are plain buttons
      if (!ele.to) {
        return (
          <button
            key={ele.name}
            type="button"
            className={`${baseItem} text-ink-300 hover:bg-ink-800 hover:text-white`}
          >
            {content}
          </button>
        );
      }

      return (
        <NavLink
          key={ele.name}
          to={ele.to}
          end={ele.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `${baseItem} ${
              isActive
                ? "bg-brand-600 text-white shadow-sm"
                : "text-ink-300 hover:bg-ink-800 hover:text-white"
            }`
          }
        >
          {content}
        </NavLink>
      );
    })}
  </nav>
);

const Navbar = () => {
  const [open, setopen] = useState(false);
  const close = () => setopen(false);

  return (
    <>
      {/* dark overlay behind the mobile drawer */}
      {open && (
        <div
          className="w-full h-screen fixed inset-0 z-40 bg-ink-900/60 lg:hidden"
          onClick={close}
        ></div>
      )}

      {/* mobile top bar */}
      <div className="w-full h-16 bg-white border-b border-ink-200 shadow-sm flex justify-between items-center px-4 lg:hidden">
        <h1 className="text-3xl font-bold text-brand-600">Shoppy</h1>
        <button
          type="button"
          className="text-4xl text-ink-800 hover:text-brand-600 transition-colors"
          onClick={() => setopen(true)}
          aria-label="Open menu"
        >
          <IoMdMenu />
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="w-[85%] h-screen fixed top-0 left-0 z-50 bg-ink-900 shadow-2xl overflow-y-auto lg:hidden">
          <div className="w-full h-16 flex justify-between items-center px-4 border-b border-ink-800">
            <h1 className="text-3xl font-bold text-white">Shoppy</h1>
            <button
              type="button"
              className="text-3xl text-ink-300 hover:text-white"
              onClick={close}
              aria-label="Close menu"
            >
              <RxCross2 />
            </button>
          </div>
          <SidebarLinks onNavigate={close} />
        </div>
      )}

      {/* desktop sidebar */}
      <div className="w-[28%] desk:w-[22%] h-screen fixed top-0 left-0 z-50 bg-ink-900 hidden lg:flex lg:flex-col lg:ml-3 lg:rounded-2xl overflow-y-auto">
        <div className="w-full h-16 flex items-center px-4 border-b border-ink-800">
          <h1 className="text-3xl font-bold text-white">
            Shoppy{" "}
            <span className="text-sm font-medium text-brand-300">Seller</span>
          </h1>
        </div>
        <SidebarLinks />
      </div>
    </>
  );
};

export default Navbar;
