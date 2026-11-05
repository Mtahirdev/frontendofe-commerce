import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBarBuyer = () => {
  return (
    <div className="w-[90%] mx-auto flex justify-center items-center gap-2 pb-5">
      <input
        type="text"
        className="w-full md:w-[40%] bg-white border border-ink-200 py-2.5 px-4 rounded-2xl text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        placeholder="Search orders..."
      />
      <button className="p-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-2xl transition-colors">
        <IoIosSearch />
      </button>
    </div>
  );
};

export default SearchBarBuyer;
