import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import ReviewForm from "./ReviewForm.jsx";

const OrderBox = ({ ele }) => {
  let [review, setreview] = useState(false);

  return (
    <>
      {review && (
        <div className="fixed w-full h-full bg-black/10 inset-0 z-40 flex justify-center">
          <ReviewForm setreview={setreview}></ReviewForm>
        </div>
      )}
      <div className="w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="flex flex-col gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-bold text-[#0B1730] sm:text-lg">
              {ele.orderNumber}
            </h2>
            <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
              Placed on {ele.date}
            </p>
          </div>
          <span className="w-fit rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 sm:text-sm">
            {ele.state}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 place-items-center w-full h-fit">
          {ele.items.map((ele) => {
            let active = ele.state == "delivered";
            return (
              <>
                <div className="flex flex-col gap-4  w-full h-fit border-t border-[#E2E8F0] pt-2 pb-2">
                  <div className="flex w-full h-fit flex-col lg:flex-row lg:justify-evenly lg:w-130  items-center gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F8FAFC] p-2 sm:h-24 sm:w-24">
                      <img
                        src={ele.mainimg}
                        alt="Wireless Headphones"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="">
                      <h3 className="line-clamp-2 text-sm font-semibold text-[#0B1730] sm:text-base">
                        {ele.productName}
                      </h3>
                      <p className="mt-1 text-xs text-[#64748B]">
                        Brand: {ele.brand}
                      </p>
                      <p className="mt-1 text-xs text-[#64748B]">
                        Quantity: {ele.qyt}
                      </p>
                    </div>
                    {active && (
                      <button
                        onClick={() => setreview(true)}
                        className=" px-4 py-1 rounded-2xl bg-orange-400 text-white hover:bg-orange-300"
                      >
                        Rate Item
                      </button>
                    )}
                  </div>
                  {/* <p className="font-bold text-[#FF5A36] ml-28 sm:ml-10 ">
              Rs. 2,499
            </p> */}
                </div>
              </>
            );
          })}
          {/* second object */}
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-[#E2E8F0] p-4 sm:grid-cols-2 sm:p-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0B1730]">
              Payment Information
            </h3>
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-[#64748B]">Payment Method</span>
              <span className="text-right font-medium text-[#0B1730]">
                {ele.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-[#64748B]">Payment Status</span>
              <span className="font-medium text-green-600">
                {ele.paymentstaus == true ? "paid" : "unpaid"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0B1730]">
              Delivery Address
            </h3>
            <p className="text-sm leading-6 text-[#64748B]">
              {ele.address.addressName}
              <br />
              {ele.address.address}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-sm text-[#64748B]">
            Total items:{" "}
            <span className="font-semibold text-[#0B1730]">
              {ele.items.length}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-sm font-medium text-[#64748B]">
              Order Total
            </span>
            <span className="text-xl font-bold text-[#FF5A36]">
              Rs. {ele.totalPrice}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderBox;
