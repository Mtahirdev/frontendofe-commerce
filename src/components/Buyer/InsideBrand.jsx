import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { GrNext, GrPrevious } from "react-icons/gr";
import img from "../../assets/about1.avif";

import "swiper/css";

const slides = [
  {
    id: 1,
    img,
    title: "Our Story",
    subtitle: "How Shoppy started and where we are going.",
  },
  {
    id: 2,
    img,
    title: "Our Team",
    subtitle: "The people who make everything possible.",
  },
  {
    id: 3,
    img,
    title: "Our Values",
    subtitle: "Quality, trust and customer care first.",
  },
  {
    id: 4,
    img,
    title: "Our Sellers",
    subtitle: "Meet the small businesses on Shoppy.",
  },
  {
    id: 5,
    img,
    title: "Our Mission",
    subtitle: "Making online shopping simple for everyone.",
  },
  {
    id: 6,
    img,
    title: "Our Community",
    subtitle: "Thousands of happy buyers and sellers.",
  },
];

const InsideBrand = () => {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="w-full flex flex-col justify-center bg-ink-50 mt-16">
      <h1 className="pl-2 md:pl-5 lg:pl-9 text-ink-900 text-2xl md:text-3xl lg:text-4xl font-bold">
        Inside Shoppy
      </h1>
      <p className="w-[80%] text-ink-800 pl-2 md:pl-5 lg:pl-9 md:pt-4 pt-1 md:text-[19px]">
        Get to know the people and ideas behind the brand.
      </p>

      <div className="flex self-end items-center gap-4 pr-2 md:pr-5 lg:pr-9 my-4">
        <button
          onClick={() => swiper?.slidePrev()}
          className="bg-ink-100 rounded-full w-12 h-12 justify-center items-center hidden md:flex text-2xl"
        >
          <GrPrevious />
        </button>
        <button
          onClick={() => swiper?.slideNext()}
          className="bg-ink-100 rounded-full w-12 h-12 justify-center items-center hidden md:flex text-2xl"
        >
          <GrNext />
        </button>
      </div>

      <div className="w-full  overflow-hidden px-2 md:px-5 lg:px-9">
        <Swiper
          onSwiper={setSwiper}
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {slides.map((item) => (
            <SwiperSlide key={item.id} className="">
              <div className="w-full">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto rounded-lg"
                />
                <h3 className="mt-3 text-lg md:text-xl font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm md:text-base text-ink-800">
                  {item.subtitle}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default InsideBrand;
