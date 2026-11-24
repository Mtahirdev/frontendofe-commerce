import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

/* ---------- countdown ---------- */
// next local midnight (used when no endTime prop is given -> sale resets daily)
const nextMidnight = () => {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.getTime();
};

const useCountdown = (endTime) => {
  const getLeft = () =>
    Math.max(
      0,
      (endTime ? new Date(endTime).getTime() : nextMidnight()) - Date.now(),
    );

  const [left, setLeft] = useState(getLeft);

  useEffect(() => {
    const t = setInterval(() => setLeft(getLeft()), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime]);

  const total = Math.floor(left / 1000);
  return {
    done: left <= 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
};

const pad = (n) => String(n).padStart(2, "0");

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-900 text-base font-bold tabular-nums text-white sm:h-12 sm:w-12 sm:text-xl">
      {value}
    </div>
    <span className="mt-1 text-[10px] font-medium text-white/90 sm:text-xs">
      {label}
    </span>
  </div>
);

const Bolt = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6 sm:h-7 sm:w-7"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

const Chevron = ({ dir }) => (
  <svg
    viewBox="0 0 20 20"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={dir === "left" ? "M12.5 4l-6 6 6 6" : "M7.5 4l6 6-6 6"} />
  </svg>
);

/* ---------- product card ---------- */
const DealCard = ({ product, basePath }) => {
  const price = Math.round(
    product.price - product.price * (product.discount / 100),
  );
  const stock = Number(product.stock);
  const lowStock = stock <= 20;
  let { type } = useSelector((state) => state.userstore);

  return (
    <Link
      to={`/${type}/productdetail/${product._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-ink-100 p-3">
        <img
          src={product.mainimg}
          alt={product.productName}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-md bg-accent-500 px-2 py-0.5 text-xs font-bold text-white">
          -{product.discount}%
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        {product.brand && (
          <p className="truncate text-xs font-medium text-brand-600">
            {product.brand}
          </p>
        )}
        <h3 className="mt-0.5 line-clamp-2 min-h-10 text-sm font-semibold text-ink-800">
          {product.productName}
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-bold text-accent-600">Rs {price}</span>
          <span className="text-xs text-ink-400 line-through">
            Rs {product.price}
          </span>
        </div>

        <div className="mt-auto pt-3">
          {lowStock && (
            <>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className={`h-full rounded-full ${stock <= 5 ? "bg-danger-500" : "bg-accent-500"}`}
                  style={{ width: `${Math.max(8, (stock / 20) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-medium text-ink-500">
                Only {stock} left
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

/* ---------- section ---------- */
/**
 * props
 *  - endTime     : date string / timestamp when the sale ends. Omit = resets every midnight.
 *  - minDiscount : smallest discount (%) to include (default 1)
 *  - limit       : max products to show (default 10)
 *  - basePath    : product detail route -> `${basePath}/${id}` (default "productdetail")
 *  - viewAllTo   : "See all" link (default "/buyer")
 */
const FlashSale = ({
  endTime,
  minDiscount = 1,
  limit = 10,
  basePath = "productdetail",
  viewAllTo = "/buyer",
}) => {
  const { productarr } = useSelector((state) => state.productstore);
  const { done, days, hours, minutes, seconds } = useCountdown(endTime);

  const deals = (productarr || [])
    .filter((p) => Number(p.discount) >= minDiscount && Number(p.stock) > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, limit);

  if (done || deals.length === 0) return null;

  return (
    <section className="mx-auto mt-10 w-[95%] overflow-hidden rounded-2xl border border-accent-100 bg-white shadow-sm">
      {/* header */}
      <div className="flex flex-col gap-4 bg-accent-500 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3 text-white">
          <Bolt />
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Flash Sale</h2>
            <p className="text-xs text-white/90 sm:text-sm">
              Limited time deals. Grab them before they are gone.
            </p>
          </div>
        </div>

        <div
          className="flex items-end gap-2 sm:gap-3"
          role="timer"
          aria-label="Time left in sale"
        >
          <span className="mb-3 hidden text-sm font-medium text-white sm:block">
            Ends in
          </span>
          {days > 0 && <TimeBox value={pad(days)} label="Days" />}
          <TimeBox value={pad(hours)} label="Hours" />
          <TimeBox value={pad(minutes)} label="Mins" />
          <TimeBox value={pad(seconds)} label="Secs" />
        </div>
      </div>

      {/* slider */}
      <div className="p-3 sm:p-5">
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{ prevEl: ".flash-prev", nextEl: ".flash-next" }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            rewind
            grabCursor
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="pb-1!"
          >
            {deals.map((p) => (
              <SwiperSlide key={p._id} className="h-auto!">
                <DealCard product={p} basePath={basePath} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* arrows: desktop only, touch users swipe */}
          <button
            type="button"
            aria-label="Previous deals"
            className="flash-prev absolute -left-2 top-1/3 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-md transition hover:bg-brand-600 hover:text-white active:scale-95 md:flex"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next deals"
            className="flash-next absolute -right-2 top-1/3 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-md transition hover:bg-brand-600 hover:text-white active:scale-95 md:flex"
          >
            <Chevron dir="right" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link
            to={viewAllTo}
            className="inline-block rounded-xl border-2 border-brand-600 px-6 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
          >
            See all products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
