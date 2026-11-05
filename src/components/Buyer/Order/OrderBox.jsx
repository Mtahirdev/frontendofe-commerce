import React, { useState } from "react";
import ReviewForm from "./ReviewForm.jsx";

const statusTone = {
  delivered: "bg-success-50 text-success-600",
  shipped: "bg-info-50 text-info-600",
  pending: "bg-warning-50 text-warning-600",
  cancelled: "bg-danger-50 text-danger-600",
};

const OrderBox = ({ ele }) => {
  const [review, setreview] = useState(false);
  const badge =
    statusTone[String(ele.state).toLowerCase()] || "bg-ink-100 text-ink-700";

  return (
    <>
      {review && (
        <div className="fixed inset-0 z-40 flex justify-center bg-ink-900/40">
          <ReviewForm setreview={setreview} />
        </div>
      )}

      <div className="w-full overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        {/* header */}
        <div className="flex flex-col gap-3 border-b border-ink-200 bg-ink-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-bold text-ink-800 sm:text-lg">
              {ele.orderNumber}
            </h2>
            <p className="mt-1 text-xs text-ink-500 sm:text-sm">
              Placed on {ele.date}
            </p>
          </div>
          <span
            className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold capitalize sm:text-sm ${badge}`}
          >
            {ele.state}
          </span>
        </div>

        {/* items */}
        <div className="flex flex-col w-full">
          {ele.items.map((item, i) => {
            const delivered = item.state == "delivered";
            return (
              <div
                key={item._id || i}
                className="flex flex-col items-center gap-3 border-t border-ink-100 first:border-t-0 p-4 sm:flex-row sm:px-6"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ink-100 p-2 sm:h-24 sm:w-24">
                  <img
                    src={item.mainimg}
                    alt={item.productName}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="line-clamp-2 text-sm font-semibold text-ink-800 sm:text-base">
                    {item.productName}
                  </h3>
                  <p className="mt-1 text-xs text-ink-500">
                    Brand: {item.brand}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    Quantity: {item.qyt}
                  </p>
                </div>

                {delivered && (
                  <button
                    onClick={() => setreview(true)}
                    className="rounded-xl bg-accent-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
                  >
                    Rate Item
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* payment + address */}
        <div className="grid grid-cols-1 gap-4 border-t border-ink-200 p-4 sm:grid-cols-2 sm:p-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-ink-800">
              Payment Information
            </h3>
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-ink-500">Payment Method</span>
              <span className="text-right font-medium text-ink-800">
                {ele.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-ink-500">Payment Status</span>
              <span
                className={`font-medium ${
                  ele.paymentstatus == "true"
                    ? "text-success-600"
                    : "text-warning-600"
                }`}
              >
                {ele.paymentstatus == "true" ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-ink-800">Delivery Address</h3>
            <p className="text-sm leading-6 text-ink-500">
              {ele.address.addressName}
              <br />
              {ele.address.address}
            </p>
          </div>
        </div>

        {/* footer */}
        <div className="flex flex-col gap-2 border-t border-ink-200 bg-ink-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-sm text-ink-500">
            Total items:{" "}
            <span className="font-semibold text-ink-800">
              {ele.items.length}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-sm font-medium text-ink-500">
              Order Total
            </span>
            <span className="text-xl font-bold text-accent-600">
              Rs {ele.totalPrice}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderBox;
