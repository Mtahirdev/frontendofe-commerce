import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import Sortbypopularity from "./Sortbypopularity";
const CateHeading = ({ setcategoryOpen }) => {
  let [sortOpen, setsortOpen] = useState(false);
  let [sortValue, setsortValue] = useState("Popularity");
  return (
    <>
      <div className="flex flex-col justify-center w-full ">
        <div className="flex flex-col grow gap-1">
          <h1 className="font-bold text-2xl ml-3">Men</h1>
          <p className="font-bold ml-3 md:text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            iste.
          </p>
        </div>
        <div
          className="flex w-[99%] justify-evenly grow mt-2"
          onClick={() => {
            setsortOpen(!sortOpen);
          }}
        >
          <div className="border-1 rounded-2xl pl-1 pr-1 flex items-center justify-center w-[70%] lg:w-[30%] md:w-[40%]">
            <p className="w-[70%] active:border-0 capitalize">
              Sort by: {sortValue}
            </p>
            <IoMdArrowDropdown className="text-2xl" />
          </div>
          <button
            onClick={() => {
              setcategoryOpen(true);
            }}
            className="border-1 pl-3 pr-3 pt-1 pb-1 rounded-2xl flex justify-center items-center gap-1"
          >
            filter
            <FaFilter />
          </button>
        </div>
        {sortOpen == true ? (
          <Sortbypopularity
            setsortValue={setsortValue}
            setsortOpen={setsortOpen}
          />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default CateHeading;
