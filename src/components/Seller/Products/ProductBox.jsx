import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteItemServer, FetchItem } from "../../../server/server";
import { toast } from "react-toastify";
import { SetProductArray } from "../../../store/feature/ProductsData";

const ProductBox = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userstore);
  const [loading, setloading] = useState(false);

  const lessprice = Math.round(
    product.price - product.price * (product.discount / 100),
  );

  const DeleteItem = async (id) => {
    if (
      !window.confirm(`Delete "${product.productName}"? This cannot be undone.`)
    )
      return;

    setloading(true);
    try {
      const res = await DeleteItemServer(id, token);

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
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("please try again later");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Link to={`/seller/productdetail/${product._id}`} className="block">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-ink-100 p-3">
            <img
              src={product.mainimg}
              alt={product.productName}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            />
            {product.discount > 0 && (
              <span className="absolute left-3 top-3 rounded-md bg-accent-500 px-2 py-1 text-xs font-bold text-white">
                -{product.discount}%
              </span>
            )}
          </div>
        </Link>

        <div className="space-y-2 p-3 sm:p-4">
          <Link to={`/seller/productdetail/${product._id}`}>
            <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-ink-800 hover:text-brand-600 sm:text-base transition-colors">
              {product.productName}
            </h3>
          </Link>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-warning-500">★</span>
            <span className="font-medium text-ink-800">{product.rating}</span>
            <span className="text-xs text-ink-500">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold text-ink-800">
              Rs {lessprice}
            </span>
            <span className="text-sm text-ink-400 line-through">
              Rs {product.price}
            </span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => navigate(`/seller/editproduct/${product._id}`)}
              className="flex flex-1 items-center justify-center rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => DeleteItem(product._id)}
              className="flex flex-1 items-center justify-center rounded-xl border-2 border-danger-500 px-3 py-2 text-sm font-semibold text-danger-600 transition-colors hover:bg-danger-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBox;
