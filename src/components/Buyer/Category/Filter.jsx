import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const list = [
  "Shirt",
  "Trouser",
  "Jackets",
  "Electronic",
  "Electric",
  "Jewelry",
  "Caps",
];
const brand = ["Nike", "Adidas", "J.", "Gul Ahmed", "Olive", "Hush Puppies"];
const color = [
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-red-500",
  "bg-gray-500",
];

const Filter = ({ setcategoryOpen }) => {
  const [value, setvalue] = useState(1000);

  const close = () => setcategoryOpen(false);

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-[95%] max-w-2xl rounded-2xl bg-white border border-ink-200 shadow-sm p-5">
        {/* heading */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-ink-800">Filter</h1>
          <button
            onClick={close}
            className="p-2 rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-800 transition-colors"
            aria-label="Close filter"
          >
            <ImCross />
          </button>
        </div>

        {/* price range */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold capitalize text-ink-800">
            price range
          </h2>
          <input
            type="range"
            name="price_range"
            max={10000}
            min={500}
            step={100}
            value={value}
            onChange={(e) => setvalue(Number(e.target.value))}
            className="w-full mt-3 accent-brand-600"
          />
          <div className="flex justify-between text-sm text-ink-500">
            <span>Rs 500</span>
            <span className="font-semibold text-brand-600">Rs {value}</span>
            <span>Rs 10000</span>
          </div>
        </div>

        {/* category */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold capitalize text-ink-800">
            category
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {list.map((e) => (
              <div key={e}>
                <input
                  type="radio"
                  name="category"
                  id={`cat-${e}`}
                  className="hidden peer"
                />
                <label
                  htmlFor={`cat-${e}`}
                  className="block cursor-pointer rounded-full border border-ink-200 bg-white px-4 py-1.5 text-ink-700 transition hover:border-brand-300 peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:text-brand-600 peer-checked:font-semibold"
                >
                  {e}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* brands */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold capitalize text-ink-800">
            brands
          </h2>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {brand.map((e) => (
              <label
                key={e}
                htmlFor={`brand-${e}`}
                className="flex items-center gap-3 cursor-pointer text-ink-700"
              >
                <input
                  type="radio"
                  name="brand"
                  id={`brand-${e}`}
                  className="h-5 w-5 accent-brand-600"
                />
                {e}
              </label>
            ))}
          </div>
        </div>

        {/* colors */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold capitalize text-ink-800">
            color
          </h2>
          <div className="flex gap-3 mt-3">
            {color.map((c) => (
              <div key={c}>
                <input
                  type="radio"
                  id={`color-${c}`}
                  name="color"
                  className="hidden peer"
                />
                <label
                  htmlFor={`color-${c}`}
                  className={`${c} block h-8 w-8 cursor-pointer rounded-full border-2 border-white ring-1 ring-ink-200 transition peer-checked:ring-2 peer-checked:ring-brand-600 peer-checked:ring-offset-2`}
                ></label>
              </div>
            ))}
          </div>
        </div>

        {/* buttons */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={close}
            className="w-1/3 rounded-xl border border-ink-200 py-3 font-medium text-ink-700 hover:bg-ink-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={close}
            className="w-2/3 rounded-xl bg-brand-600 py-3 text-lg font-semibold text-white hover:bg-brand-700 active:scale-95 transition"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
