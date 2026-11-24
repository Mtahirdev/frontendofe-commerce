import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteItemServer, FetchItem } from "../../../server/server";
import { SetProductArray } from "../../../store/feature/ProductsData";

// same names as the form's color list (custom colors are saved as "#hex")
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

const splitList = (v) =>
  Array.isArray(v)
    ? v.filter(Boolean)
    : String(v || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

const ProductDetailBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userstore);
  const { productarr } = useSelector((state) => state.productstore);
  const [loading, setloading] = useState(false);
  const [active, setActive] = useState(0);

  const product = productarr?.find((ele) => ele._id == id);

  const DeleteItem = async () => {
    if (
      !window.confirm(`Delete "${product.productName}"? This cannot be undone.`)
    )
      return;

    setloading(true);
    try {
      const res = await DeleteItemServer(product._id, token);

      if (res.msg_login) {
        setloading(false);
        toast.error("please login");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error("please signup");
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msgerr) {
        setloading(false);
        toast.error("please try again later");
      } else if (res.msg_validation) {
        setloading(false);
        toast.error(res.validation.msg);
      } else {
        toast.success("item delete successfully");
        const list = await FetchItem(token);
        if (!list.msg_login && !list.msg_signup && !list.msgerr) {
          dispatch(SetProductArray(list.products));
        }
        setloading(false);
        setTimeout(() => navigate("/seller"), 1500);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("please try again later");
    }
  };

  // product list is empty (e.g. page refresh) or id not found
  if (!product) {
    return (
      <div className="w-[95%] rounded-2xl border border-ink-200 bg-white py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-ink-800">Product not found</p>
        <p className="mt-1 text-ink-500">
          It may have been deleted, or the list is still loading.
        </p>
        <Link
          to="/seller"
          className="mt-5 inline-block rounded-xl bg-brand-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Back to products
        </Link>
      </div>
    );
  }

  /* ---------- derived data ---------- */
  const images = product.arrofimg?.length
    ? product.arrofimg
    : product.mainimg
      ? [product.mainimg]
      : [];
  const mainSrc = images[active] || images[0];

  const categories = splitList(product.category);
  const colors = splitList(product.color);

  const lessprice = Math.round(
    product.price - product.price * (product.discount / 100),
  );
  const stock = Number(product.stock);
  const stockTone =
    stock <= 0
      ? "bg-danger-50 text-danger-600"
      : stock <= 5
        ? "bg-warning-50 text-warning-600"
        : "bg-success-50 text-success-600";
  const stockText =
    stock <= 0 ? "Out of stock" : stock <= 5 ? "Low stock" : "In stock";

  const details = [
    { label: "Size", value: product.size },
    { label: "Unit", value: product.unit },
    { label: "Stock", value: product.stock },
    { label: "Reviews", value: product.reviews },
  ];

  return (
    <>
      {loading && (
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}

      <div className="w-[95%] overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-[320px_1fr] md:p-6 lg:grid-cols-[420px_1fr]">
          {/* ---------- gallery ---------- */}
          <div className="flex w-full flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-ink-100 p-4">
              {mainSrc && (
                <img
                  src={mainSrc}
                  alt={product.productName}
                  className="h-full w-full object-contain"
                />
              )}
              {product.discount > 0 && (
                <span className="absolute left-3 top-3 rounded-md bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                  -{product.discount}%
                </span>
              )}
              {images.length > 1 && (
                <span className="absolute bottom-3 right-3 rounded-full bg-ink-900/70 px-2.5 py-1 text-xs font-medium text-white">
                  {active + 1} / {images.length}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((src, i) => (
                  <button
                    type="button"
                    key={src + i}
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`aspect-square overflow-hidden rounded-lg border-2 bg-ink-100 transition ${
                      active === i
                        ? "border-brand-500"
                        : "border-ink-200 hover:border-brand-300"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- info ---------- */}
          <div className="flex min-w-0 flex-col">
            <div className="border-b border-ink-200 pb-4">
              {product.brand && (
                <p className="text-sm font-medium text-brand-600">
                  {product.brand}
                </p>
              )}
              <h2 className="mt-1 break-words text-xl font-bold text-ink-800 sm:text-2xl lg:text-3xl">
                {product.productName}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-warning-500">★</span>
                <span className="font-semibold text-ink-800">
                  {product.rating}
                </span>
                <span className="text-sm text-ink-500">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* price */}
            <div className="flex flex-wrap items-center gap-3 border-b border-ink-200 py-5">
              <span className="text-3xl font-bold text-ink-800">
                Rs {lessprice}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-base text-ink-400 line-through">
                    Rs {product.price}
                  </span>
                  <span className="rounded-md bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-600">
                    {product.discount}% OFF
                  </span>
                </>
              )}
              <span
                className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${stockTone}`}
              >
                {stockText}
              </span>
            </div>

            {/* category + colors */}
            <div className="flex flex-col gap-4 border-b border-ink-200 py-5">
              <div>
                <p className="text-xs font-medium text-ink-500">Category</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {colors.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-ink-500">Colors</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {colors.map((c) => {
                      const hex = c.startsWith("#") ? c : COLOR_HEX[c];
                      return (
                        <span
                          key={c}
                          className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1 pl-1.5 pr-3 text-sm text-ink-700"
                        >
                          {hex && (
                            <span
                              className="h-5 w-5 rounded-full border border-ink-200"
                              style={{ backgroundColor: hex }}
                            />
                          )}
                          {c}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* other details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-b border-ink-200 py-5 sm:grid-cols-4">
              {details.map((d) => (
                <div key={d.label}>
                  <p className="text-xs font-medium text-ink-500">{d.label}</p>
                  <p className="mt-1 font-semibold text-ink-800">{d.value}</p>
                </div>
              ))}
            </div>

            <div className="py-5">
              <h3 className="text-base font-bold text-ink-800">Description</h3>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-ink-500 sm:text-base">
                {product.description}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate(`/seller/editproduct/${product._id}`)}
                className="flex-1 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Edit Product
              </button>
              <button
                type="button"
                onClick={DeleteItem}
                className="flex-1 rounded-xl border-2 border-danger-500 px-5 py-3 font-semibold text-danger-600 transition-colors hover:bg-danger-500 hover:text-white"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailBox;
