import React, { useState } from "react";
import { TbChartBarPopular } from "react-icons/tb";
import { MdOutlineHighlight } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

const Sortbypopularity = ({ setsortValue, setsortOpen }) => {
  let [arr, setarr] = useState([
    { icon: <TbChartBarPopular />, text: "Popularity", tailwind: false },
    { icon: <MdOutlineHighlight />, text: "newest arrivals", tailwind: false },
    { icon: <FaRegStar />, text: "highest rated", tailwind: false },
    { icon: <IoBag />, text: "best selling", tailwind: false },
  ]);

  let setArrfun = (e, i) => {
    let newarr = arr.map((element, index) => {
      if (index == i) {
        element.tailwind = true;
        setsortValue(element.text);
        setsortOpen(false);
        return element;
      } else {
        element.tailwind = false;
        return element;
      }
    });

    setarr(newarr);
  };
  return (
    <>
      <div className="flex flex-col mx-auto w-[80%] md:w-[50%] lg:w-[40%] h-fit shadow-md shadow-gray-300 mt-5 gap-5 pb-3 pt-3 pl-3 pr-3 rounded-2xl">
        {arr.map((e, i) => {
          return (
            <div
              key={i}
              className={`flex gap-3  ${e.tailwind == true ? "shadow-lg shadow-blue-300 rounded-[10px]" : ""}`}
              onClick={() => {
                setArrfun(e, i);
              }}
            >
              <div className="text-4xl">{e.icon}</div>
              <div>
                <p className="text-2xl">{e.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sortbypopularity;
