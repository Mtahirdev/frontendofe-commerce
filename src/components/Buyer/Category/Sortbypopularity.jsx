import React from "react";
import { TbChartBarPopular } from "react-icons/tb";
import { MdOutlineHighlight } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

const options = [
  { icon: <TbChartBarPopular />, text: "Popularity" },
  { icon: <MdOutlineHighlight />, text: "Newest arrivals" },
  { icon: <FaRegStar />, text: "Highest rated" },
  { icon: <IoBag />, text: "Best selling" },
];

const Sortbypopularity = ({ sortValue, setsortValue, setsortOpen }) => {
  const choose = (text) => {
    setsortValue(text);
    setsortOpen(false);
  };

  return (
    <div className="flex flex-col w-full md:w-[50%] lg:w-[35%] mt-3 gap-1 p-2 rounded-2xl bg-white border border-ink-200 shadow-md">
      {options.map((e) => {
        const active = sortValue === e.text;
        return (
          <button
            key={e.text}
            type="button"
            onClick={() => choose(e.text)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
              active
                ? "bg-brand-50 text-brand-600 font-semibold"
                : "text-ink-700 hover:bg-ink-50"
            }`}
          >
            <span className="text-2xl">{e.icon}</span>
            <span className="text-lg">{e.text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Sortbypopularity;
