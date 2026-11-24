import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { GrNext, GrPrevious } from "react-icons/gr";
import "swiper/css";
import iphone1 from "../../assets/iphone1.png";
import iphone2 from "../../assets/iphone2.png";
import iphone3 from "../../assets/iphone3.png";
import iphone4 from "../../assets/iphone4.png";
import iphone5 from "../../assets/iphone5.png";
import iphone6 from "../../assets/iphone6.png";

const phones = [iphone1, iphone2, iphone3, iphone4, iphone5, iphone6];

const Phone = () => {
  const [swiper, setSwiper] = useState(null);

  return (
    <>
      <div className="w-full h-fit flex justify-center items-center mt-10">
        {/* <h1 className="text-ink-900 text-2xl font-bold md:text-4xl ">Phone</h1> */}
      </div>

      <div className="w-full flex justify-center mt-6">
        <div className="relative w-[95%] px-10 md:px-14">
          {/* left button */}
          <button
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous"
            className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 bg-ink-100 rounded-full w-9 h-9 md:w-12 md:h-12 flex justify-center items-center text-lg md:text-2xl"
          >
            <GrPrevious />
          </button>

          <Swiper
            onSwiper={setSwiper}
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {phones.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="flex justify-center items-center">
                  <img
                    src={src}
                    alt={`iPhone ${i + 1}`}
                    className="h-auto md:h-auto w-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* right button */}
          <button
            onClick={() => swiper?.slideNext()}
            aria-label="Next"
            className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 bg-ink-100 rounded-full w-9 h-9 md:w-12 md:h-12 flex justify-center items-center text-lg md:text-2xl"
          >
            <GrNext />
          </button>
        </div>
      </div>
    </>
  );
};

export default Phone;
