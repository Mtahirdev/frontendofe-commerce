import React from "react";
import { IoIosAlert } from "react-icons/io";

const OrderSummary = ({
  count,
  subtotal,
  shipping,
  discount,
  total,
  loading,
  pushData,
}) => {
  return (
    <div className="bg-white border border-ink-200 shadow-sm rounded-2xl p-5 h-fit md:col-span-2 lg:col-span-1">
      <h1 className="text-2xl font-bold text-ink-800 mb-4">Order Summary</h1>

      <div className="flex justify-between items-center text-ink-500">
        <span>
          Subtotal <span className="text-ink-400">({count} items)</span>
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
        <span className="font-semibold text-success-600">- Rs {discount}</span>
      </div>

      <div className="h-px w-full bg-ink-200 my-4"></div>

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-ink-800">Total</span>
        <span className="text-2xl font-bold text-accent-600">Rs {total}</span>
      </div>

      <button
        onClick={pushData}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-lg font-semibold py-3 transition"
      >
        Place Order
      </button>

      <p className="mt-4 text-center text-sm text-ink-500">
        By placing this order, you agree to our{" "}
        <a href="#" className="text-brand-600 hover:underline">
          Terms & Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="text-brand-600 hover:underline">
          Privacy Policy
        </a>
      </p>

      <p className="mt-3 rounded-lg bg-warning-50 text-warning-600 text-sm text-center px-3 py-2">
        Please check your delivery address in the profile section.
      </p>
    </div>
  );
};

export default OrderSummary;
