import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <>
      <div className="w-full h-fit flex justify-evenly">
        <input
          type="text"
          className="bg-[#F8FAFC] w-[70%] md:w-[40%] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
          placeholder="Search..."
        />
        <button className="text-4xl">
          <IoIosSearch />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
