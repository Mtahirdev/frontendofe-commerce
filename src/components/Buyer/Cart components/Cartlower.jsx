import React from "react";
import { IoIosAlert } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cartlower = () => {
  const navigate = useNavigate();
  const { cartarr } = useSelector((s) => s.productstore);

  if (!cartarr || cartarr.length === 0) return null;

  const subtotal = Math.round(
    cartarr.reduce((sum, ele) => {
      const discounted = ele.price - ele.price * (ele.discount / 100);
      return sum + discounted * ele.qyt;
    }, 0),
  );

  const shipping = subtotal > 4000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col w-[90%] lg:w-[50%] h-fit bg-white border border-ink-200 rounded-2xl shadow-sm mt-2 mb-5 p-5">
      <h1 className="text-2xl font-bold text-ink-800 mb-4">Order Summary</h1>

      <div className="flex justify-between items-center text-ink-500">
        <span>
          Subtotal{" "}
          <span className="text-ink-400">({cartarr.length} items)</span>
        </span>
        <span className="font-semibold text-ink-800">Rs {subtotal}</span>
      </div>

      <div className="flex justify-between items-start mt-3 text-ink-500">
        <div>
          <div className="flex items-center gap-1.5">
            <span>Shipping</span>
            <IoIosAlert className="text-info-500" />
          </div>
          <p className="text-xs text-ink-400 mt-1">
            Free shipping over Rs 4000
          </p>
        </div>
        {shipping === 0 ? (
          <span className="font-semibold text-success-600">Free</span>
        ) : (
          <span className="font-semibold text-ink-800">Rs {shipping}</span>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 text-ink-500">
        <span>Discount</span>
        <span className="font-semibold text-success-600">- Rs 0</span>
      </div>

      <div className="h-px w-full bg-ink-200 my-4"></div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-ink-800">Total</span>
        <span className="text-2xl font-bold text-accent-600">Rs {total}</span>
      </div>

      <button
        onClick={() => navigate("/buyer/payment")}
        className="mt-5 w-full rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-lg font-semibold py-3 capitalize transition"
      >
        proceed to checkout
      </button>
    </div>
  );
};

export default Cartlower;
