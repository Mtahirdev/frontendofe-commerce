import { useEffect, useState } from "react";
import imgA from "../../assets/banner2.jpg";
import imgB from "../../assets/banner1.jpg";
import imgC from "../../assets/img3.jpg";
import imgD from "../../assets/img4.jpg";
import imgE from "../../assets/img5.jpg";

import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Banner = () => {
  const images = [imgA, imgC, imgE, imgB, imgD];
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const previous = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full justify-center items-center text-center h-90 sm:h-130 mt-4 rounded-2xl ">
      {/* <button onClick={previous} className="text-4xl dark:text-white">
        <GrFormPrevious />
      </button> */}

      <div className="relative w-[90%] h-full flex items-center justify-center">
        <img
          src={images[index]}
          className="rounded-2xl w-full h-full object-cover "
          alt=""
        />

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-white w-5" : "bg-white/50 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* <button onClick={next} className="text-4xl dark:text-white">
        <MdNavigateNext />
      </button> */}
    </div>
  );
};

export default Banner;
