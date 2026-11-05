import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DeleteItemServer, FetchItem } from "../../../server/server";
import { SetProductArray } from "../../../store/feature/ProductsData";

const ProductDetailBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userstore);
  const { productarr } = useSelector((state) => state.productstore);
  const [loading, setloading] = useState(false);

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
    { label: "Category", value: product.category },
    { label: "Color", value: product.color },
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
        <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-[280px_1fr] md:p-6 lg:grid-cols-[320px_1fr]">
          {/* image */}
          <div className="w-full">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-ink-100 p-4">
              <img
                src={product.mainimg}
                alt={product.productName}
                className="h-full w-full object-contain"
              />
              {product.discount > 0 && (
                <span className="absolute left-3 top-3 rounded-md bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col">
            <div className="border-b border-ink-200 pb-4">
              {product.brand && (
                <p className="text-sm font-medium text-brand-600">
                  {product.brand}
                </p>
              )}
              <h2 className="mt-1 text-xl font-bold text-ink-800 sm:text-2xl lg:text-3xl">
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

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 py-5 sm:grid-cols-3">
              {details.map((d) => (
                <div key={d.label}>
                  <p className="text-xs font-medium text-ink-500">{d.label}</p>
                  <p className="mt-1 font-semibold text-ink-800">{d.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-b border-ink-200 pb-5">
              <span className="text-3xl font-bold text-ink-800">
                Rs {lessprice}
              </span>
              <span className="text-base text-ink-400 line-through">
                Rs {product.price}
              </span>
              <span className="rounded-md bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-600">
                {product.discount}% OFF
              </span>
              <span
                className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${stockTone}`}
              >
                {stockText}
              </span>
            </div>

            <div className="py-5">
              <h3 className="text-base font-bold text-ink-800">Description</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500 sm:text-base">
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
