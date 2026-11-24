import React from "react";
import mac1 from "../../assets/mac7.jpg";
import mac2 from "../../assets/mac9.jpg";
import mac3 from "../../assets/mac8.jpg";
import mac4 from "../../assets/mac4.jpg";
import mac5 from "../../assets/mac5.jpg";
import mac6 from "../../assets/mac6.jpg";

const ProductGridOne = () => {
  let arr = [
    { img: mac2, heading: "MacBook Pro", dec: "Pro LED Display" },
    { img: mac1, heading: "MacBook Pro", dec: "Pro LED Display" },
    { img: mac3, heading: "MacBook Pro", dec: "Pro LED Display" },
    { img: mac4, heading: "MacBook Pro", dec: "Pro LED Display" },
    { img: mac6, heading: "MacBook Pro", dec: "Pro LED Display" },
    { img: mac5, heading: "MacBook Pro", dec: "Pro LED Display" },
  ];
  return (
    <>
      <div className="w-full h-fit flex justify-center items-center mt-16">
        <div className="w-full lg:w-[95%] lg:gap-4 gap-3 h-fit grid gird-cols-1 lg:grid-cols-2">
          {arr.map((ele, index) => {
            return index % 2 === 0 ? (
              <div
                style={{ backgroundImage: `url(${ele.img})` }}
                className="w-full h-120 bg-ink-200 bg-center bg-cover flex flex-col items-center"
              >
                <h1 className="text-ink-900 mt-5 text-3xl font-bold">
                  {ele.heading}
                </h1>
                <p className="text-ink-900 mt-1 text-2xl">{ele.dec}</p>
                {/* <img src={ele.img} alt="" /> */}
              </div>
            ) : (
              <div
                style={{ backgroundImage: `url(${ele.img})` }}
                className="w-full h-120 bg-ink-900 bg-cover bg-center flex flex-col items-center "
              >
                <h1 className="text-ink-100 mt-5 text-3xl font-bold">
                  {ele.heading}
                </h1>
                <p className="text-ink-100 mt-1 text-2xl">{ele.dec}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductGridOne;
