import React from "react";
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoBag } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, Form, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { type } = useSelector((state) => {
    return state.userstore;
  });
  console.log(type);

  return (
    <>
      {/* big screen */}
      <div className="hidden md:flex  bg-gray-50 border-b-2 border-gray-200 fixed top-0 left-0 z-50">
        <div className="  items-center w-screen  justify-evenly flex mt-3">
          <div className="w-[15%] lg:w-[20%] ">
            <h1 className="font-bold text-3xl capitalize mb-2 text-center">
              shoppy
            </h1>
          </div>
          <div className="w-[50%] lg:w-[70%]  ">
            <ul className="flex text-[15px] justify-evenly">
              <NavLink to="/buyer">
                <li>Home</li>
              </NavLink>
              <NavLink to="/buyer/category">
                <li>Category</li>
              </NavLink>
              <NavLink to="/buyer/cart">
                <li>
                  Cart
                  {/* <span className=" absolute top-4 text-blue-600  lg:left-[50.5%] mobileF:left-[50.5%] rounded-full p-0 h-3">
                    0
                  </span> */}
                </li>
              </NavLink>
              <NavLink to="/buyer/profile">
                <li>Profile</li>
              </NavLink>
              <NavLink to="/buyer/order">
                <li>Order</li>
              </NavLink>
              <NavLink to="/buyer/notification">
                <li>Notification</li>
              </NavLink>
            </ul>
          </div>
          <div className="w-[30%] lg:w-[40%]  ">
            <form action="" className="flex justify-evenly ">
              <input
                type="text"
                className="w-44 pt-1 pb-1 placeholder:capitalize placeholder:pl-2 border-2 border-gray-200 rounded-2xl lg:w-52 xl:w-64"
                placeholder="search"
              />
              <button className="text-2xl">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
