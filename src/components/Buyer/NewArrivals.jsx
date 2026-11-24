import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const COLOR_HEX = {
  Black: "#111827",
  White: "#ffffff",
  Gray: "#9ca3af",
  Red: "#ef4444",
  Orange: "#f97316",
  Yellow: "#facc15",
  Green: "#10b981",
  Blue: "#3b82f6",
  Navy: "#1e3a8a",
  Purple: "#8b5cf6",
  Pink: "#ec4899",
  Brown: "#92400e",
};

// "Black,Red" -> ["Black", "Red"]
const splitList = (v) =>
  Array.isArray(v)
    ? v.filter(Boolean)
    : String(v || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

const TABS = ["All", "Men", "Women", "Kids", "Fashion", "Electronic", "Electric"];

/* ---------- product card ---------- */
const ProductCard = ({ product, basePath }) => {
  const hasDiscount = Number(product.discount) > 0;
  const price = Math.round(
    product.price - product.price * (product.discount / 100),
  );
  const stock = Number(product.stock);
  const colors = splitList(product.color);
  const first = product.arrofimg?.[0] || product.mainimg;
  const second = product.arrofimg?.[1]; // shown on hover when available

  return (
    <Link
      to={`${basePath}/${product._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-ink-100">
        <img
          src={first}
          alt={product.productName}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-contain p-3 transition-opacity duration-300 ${
            second ? "group-hover:opacity-0" : ""
          }`}
        />
        {second && (
          <img
            src={second}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        <div className="absolute left-2 top-2 flex flex-col gap-1">
          <span className="rounded-md bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
            New
          </span>
          {hasDiscount && (
            <span className="rounded-md bg-accent-500 px-2 py-0.5 text-xs font-bold text-white">
              -{product.discount}%
            </span>
          )}
        </div>

        {stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="rounded-full bg-danger-50 px-3 py-1 text-xs font-semibold text-danger-600">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {product.brand && (
          <p className="truncate text-xs font-medium text-brand-600">
            {product.brand}
          </p>
        )}
        <h3 className="mt-0.5 line-clamp-2 min-h-10 text-sm font-semibold text-ink-800">
          {product.productName}
        </h3>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-ink-500">
          <span className="text-warning-500">★</span>
          <span className="font-semibold text-ink-700">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-bold text-ink-800">Rs {price}</span>
          {hasDiscount && (
            <span className="text-xs text-ink-400 line-through">
              Rs {product.price}
            </span>
          )}
        </div>

        {colors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            {colors.slice(0, 4).map((c) => (
              <span
                key={c}
                title={c}
                className="h-4 w-4 rounded-full border border-ink-200"
                style={{
                  backgroundColor: c.startsWith("#") ? c : COLOR_HEX[c] || "#e2e8f0",
                }}
              />
            ))}
            {colors.length > 4 && (
              <span className="text-xs text-ink-500">+{colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

/* ---------- section ---------- */
/**
 * props
 *  - limit     : max products shown (default 8)
 *  - tabs      : category tabs, first one should be "All"
 *  - basePath  : product detail route -> `${basePath}/${id}` (default "/buyer/product")
 *  - viewAllTo : "View all" link (default "/buyer")
 */
const NewArrivals = ({
  limit = 8,
  tabs = TABS,
  basePath = "/buyer/product",
  viewAllTo = "/buyer",
}) => {
  const { productarr } = useSelector((state) => state.productstore);
  const [tab, setTab] = useState(tabs[0]);

  // newest first: assumes products are stored in the order they were added
  const items = useMemo(() => {
    const list = [...(productarr || [])].reverse();
    const filtered =
      tab === tabs[0]
        ? list
        : list.filter((p) => splitList(p.category).includes(tab));
    return filtered.slice(0, limit);
  }, [productarr, tab, tabs, limit]);

  return (
    <section className="mx-auto w-[95%]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink-800 sm:text-2xl">
            New arrivals
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Fresh products added by our sellers
          </p>
        </div>

        {/* tabs: scroll sideways on small screens */}
        <div
          role="tablist"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:px-0 sm:pb-0"
        >
          {tabs.map((t) => (
            <button
              type="button"
              role="tab"
              aria-selected={tab === t}
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition active:scale-95 ${
                tab === t
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-300 bg-white py-12 text-center">
          <p className="font-semibold text-ink-800">No products in {tab} yet</p>
          <p className="mt-1 text-sm text-ink-500">Check another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p._id} product={p} basePath={basePath} />
          ))}
        </div>
      )}

      <div className="mt-5 text-center">
        <Link
          to={viewAllTo}
          className="inline-block rounded-xl border-2 border-brand-600 px-6 py-2 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
        >
          View all products
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
