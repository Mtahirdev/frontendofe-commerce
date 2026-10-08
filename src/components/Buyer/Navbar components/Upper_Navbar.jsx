import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Set_Nav_Toggle_Buyer } from "../../../store/feature/NavToggleBuyer.js";

const Upper_Navbar = () => {
  let dispatch = useDispatch();
  return (
    <div>
      <div className="w-screen fixed top-0 left-0  flex justify-evenly items-center h-16 md:hidden bg-gray-50 border-b-2 border-gray-200 z-50">
        <h1 className="text-3xl ml-1 mb-2 font-bold ">Shoppy</h1>

        <button
          className="text-4xl"
          onClick={() => dispatch(Set_Nav_Toggle_Buyer())}
        >
          <IoIosMenu></IoIosMenu>
        </button>
      </div>
    </div>
  );
};

export default Upper_Navbar;
