import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// "Men,Fashion" -> ["Men", "Fashion"]
const splitList = (v) =>
  Array.isArray(v)
    ? v.filter(Boolean)
    : String(v || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

const DEFAULT_CATEGORIES = [
  "Men",
  "Women",
  "Kids",
  "Fashion",
  "Electronic",
  "Electric",
];

const Arrow = () => (
  <svg
    viewBox="0 0 20 20"
    className="h-4 w-4 transition-transform group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

/**
 * props
 *  - categories : list of category names to show (default: Men, Women, Kids, Fashion, Electronic, Electric)
 *  - basePath   : where a category opens -> `${basePath}?category=Men` (default "/buyer")
 *  - title / subtitle : section heading text
 */
const ShopByCategory = ({
  categories = DEFAULT_CATEGORIES,
  basePath = "/buyer",
  title = "Shop by category",
  subtitle = "Find what you need faster",
}) => {
  const { productarr } = useSelector((state) => state.productstore);

  // for each category: product count + a cover image from its newest product
  const cards = useMemo(() => {
    const list = productarr || [];
    return categories.map((name) => {
      const items = list.filter((p) => splitList(p.category).includes(name));
      const cover = items[items.length - 1];
      return {
        name,
        count: items.length,
        image: cover?.arrofimg?.[0] || cover?.mainimg || "",
      };
    });
  }, [productarr, categories]);

  return (
    <section className="mx-auto w-[95%]">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink-800 sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-ink-500">{subtitle}</p>
        </div>
        <Link
          to={basePath}
          className="group hidden items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 sm:flex"
        >
          View all
          <Arrow />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {cards.map((c) => (
          <Link
            key={c.name}
            to={`${basePath}?category=${encodeURIComponent(c.name)}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-ink-200 bg-ink-100 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {c.image ? (
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-50 text-5xl font-bold text-brand-200">
                {c.name.charAt(0)}
              </div>
            )}

            {/* label bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-ink-900/70 px-3 py-2.5 text-white backdrop-blur-sm">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">
                  {c.name}
                </p>
                <p className="text-xs text-white/80">
                  {c.count} {c.count === 1 ? "product" : "products"}
                </p>
              </div>
              <span className="shrink-0 text-white/90">
                <Arrow />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center sm:hidden">
        <Link
          to={basePath}
          className="inline-block rounded-xl border-2 border-brand-600 px-6 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
        >
          View all
        </Link>
      </div>
    </section>
  );
};

export default ShopByCategory;
