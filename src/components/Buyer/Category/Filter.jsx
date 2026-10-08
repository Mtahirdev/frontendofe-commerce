import React, { useState } from "react";
import { ImCross } from "react-icons/im";
const Filter = ({ setcategoryOpen }) => {
  let [value, setvalue] = useState(500);
  let changevalue = (e) => {
    let a = Number(e.target.value);
    setvalue(a);
  };
  let list = [
    "Shirt",
    "Trouser",
    "Jackets",
    "Electronic",
    "Electric",
    "Jewelry",
    "Caps",
  ];
  let brand = ["Nike", "Adidos", "J.", "Gul Ahmed", "Olive", "Hash Puppies"];
  let color = [
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-red-500",
    "bg-gray-500",
  ];
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="w-[95%] h-fit  rounded-t-2xl shadow-sm shadow-gray-500 pb-5">
          {/* Filter Heading */}
          <div className="flex w-full mt-2 justify-evenly gap-[40%]">
            <h1 className="text-2xl ">Filter</h1>
            <button
              className="text-2xl "
              onClick={() => {
                setcategoryOpen(false);
              }}
            >
              <ImCross />
            </button>
          </div>
          {/* Range */}
          <div className="flex flex-col gap-3 w-[90%] ml-3 mt-3">
            <h1 className="capitalize text-2xl ">price range</h1>
            <input
              type="range"
              name="price_range"
              id=""
              max={10000}
              min={500}
              step={100}
              defaultValue={1000}
              onChange={changevalue}
            />
            <div className="flex w-[90%] justify-between ml-3">
              <h1 className="text-2xl ">500</h1>
              <h1 className="text-2xl ">{value}</h1>
              <h1 className="text-2xl ">10000</h1>
            </div>
          </div>
          {/* Category */}
          <div className="flex flex-col gap-3 w-[90%] ml-3 mt-3">
            <h1 className="capitalize text-2xl ">category</h1>
            <div className="flex overflow-x-scroll justify-evenly gap-[10%] scrollbar-none">
              {list.map((e) => {
                return (
                  <div key={e}>
                    <input
                      type="radio"
                      name="category"
                      id={e}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={e}
                      className="text-[20px] border-2 rounded-[10px] pl-2 pr-2 block  peer-checked:border-green-500"
                    >
                      {e}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Brands */}
          <div className="flex flex-col gap-3 w-[90%] ml-3 mt-3">
            <h1 className="capitalize text-2xl ">brands</h1>
            <div className="flex flex-col  gap-[10%]">
              {brand.map((e) => {
                return (
                  <div key={e} className="flex gap-4">
                    <input type="radio" name="brand" id={e} />
                    <label htmlFor={e} className="text-[20px] ">
                      {e}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Colors */}
          <div className="flex flex-col gap-3 w-[90%] ml-3 mt-3">
            <h1 className="capitalize text-2xl ">color</h1>
            <div className="flex overflow-x-scroll justify-evenly gap-[10%] scrollbar-none">
              {color.map((color) => (
                <div key={color}>
                  <input
                    type="radio"
                    id={color}
                    name="color"
                    className="hidden peer"
                  />

                  <label
                    htmlFor={color}
                    className={`${color} w-6 h-6 rounded-full block cursor-pointer border-2 border-gray-300 peer-checked:border-2 peer-checked:border-gray-800`}
                  ></label>
                </div>
              ))}
            </div>
          </div>
          {/* Button */}
          <div className="w-full  mt-4 flex">
            <button
              onClick={() => {
                setcategoryOpen(false);
              }}
              className=" text-[20px] text-center w-[90%] border-2 rounded-[10px] bg-purple-500 text-white md:w-[50%] mx-auto pt-2 pb-2 lg:w-[30%] "
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;

// 104095230058
