import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import Sortbypopularity from "./Sortbypopularity";

const CateHeading = ({ setcategoryOpen }) => {
  const [sortOpen, setsortOpen] = useState(false);
  const [sortValue, setsortValue] = useState("Popularity");

  return (
    <div className="flex flex-col w-[95%] mx-auto mt-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl text-ink-800">Men</h1>
        <p className="text-ink-500 md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, iste.
        </p>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={() => setsortOpen(!sortOpen)}
          className="flex flex-1 items-center justify-between rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-700 hover:border-brand-300 transition md:max-w-xs"
        >
          <span className="capitalize">Sort by: {sortValue}</span>
          <IoMdArrowDropdown
            className={`text-2xl transition-transform ${sortOpen ? "rotate-180" : ""}`}
          />
        </button>

        <button
          type="button"
          onClick={() => setcategoryOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 transition-colors"
        >
          Filter
          <FaFilter />
        </button>
      </div>

      {sortOpen && (
        <Sortbypopularity
          sortValue={sortValue}
          setsortValue={setsortValue}
          setsortOpen={setsortOpen}
        />
      )}
    </div>
  );
};

export default CateHeading;
