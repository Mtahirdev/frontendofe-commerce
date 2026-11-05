import React from "react";
import women from "../../assets/women.jfif";
import men from "../../assets/men.jfif";
import kids from "../../assets/kids.jfif";
import shirt from "../../assets/shirt.jfif";
import jackets from "../../assets/jackets.jfif";

const Category = () => {
  let arr = [
    { name: "Women", img: women },
    { name: "Men", img: men },
    { name: "Kids", img: kids },
    { name: "Shirts", img: shirt },
    { name: "Jackets", img: jackets },
  ];
  return (
    <>
      <h1 className="ml-4 mt-6 text-3xl font-extrabold text-ink-800">
        Category
      </h1>
      <div className="flex mx-auto w-[90%] md:justify-center gap-8 mt-3 items-center overflow-x-scroll scrollbar-none">
        {arr.map((e) => (
          <a
            key={e.name}
            className="group flex flex-col gap-2 w-full cursor-pointer"
          >
            <img
              src={e.img}
              alt={e.name}
              className="w-50 h-30 rounded-2xl object-cover border-2 border-transparent group-hover:border-brand-500 transition"
            />
            <h3 className="w-30 text-center font-medium text-ink-700 group-hover:text-brand-600 transition-colors md:ml-3 lg:ml-6">
              {e.name}
            </h3>
          </a>
        ))}
      </div>
    </>
  );
};

export default Category;
