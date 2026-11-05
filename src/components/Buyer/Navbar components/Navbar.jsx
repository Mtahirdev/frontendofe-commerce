import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/buyer", label: "Home", end: true },
  { to: "/buyer/category", label: "Category" },
  { to: "/buyer/cart", label: "Cart" },
  { to: "/buyer/profile", label: "Profile" },
  { to: "/buyer/order", label: "Order" },
  { to: "/buyer/notification", label: "Notification" },
];

const Navbar = () => {
  return (
    <div className="hidden md:flex w-full bg-white border-b border-ink-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="w-full flex justify-evenly items-center py-3">
        <div className="w-[15%] lg:w-[20%]">
          <h1 className="font-bold text-3xl capitalize text-center text-brand-600">
            shoppy
          </h1>
        </div>

        <ul className="w-[50%] lg:w-[70%] flex text-[15px] justify-evenly">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-colors ${
                    isActive
                      ? "text-brand-600 border-brand-600 font-medium"
                      : "text-ink-500 border-transparent hover:text-brand-600"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="w-[30%] lg:w-[40%]">
          <form className="flex justify-evenly items-center">
            <input
              type="text"
              className="w-44 py-1.5 px-3 text-ink-800 bg-ink-50 placeholder:capitalize placeholder:text-ink-400 border border-ink-200 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 lg:w-52 xl:w-64"
              placeholder="search"
            />
            <button className="p-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white transition-colors">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
