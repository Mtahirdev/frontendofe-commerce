import React from "react";
import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Set_Nav_Toggle_Buyer } from "../../../store/feature/NavToggleBuyer.js";

const Upper_Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full fixed top-0 left-0 flex justify-between items-center px-4 h-16 md:hidden bg-white border-b border-ink-200 shadow-sm z-50">
      <h1 className="text-3xl font-bold text-brand-600">Shoppy</h1>

      <button
        className="text-4xl text-ink-800 hover:text-brand-600 transition-colors"
        onClick={() => dispatch(Set_Nav_Toggle_Buyer())}
      >
        <IoIosMenu />
      </button>
    </div>
  );
};

export default Upper_Navbar;
