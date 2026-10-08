import React from "react";
import Logo from "../../../assets/logo.png";

const OrderBox = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex flex-col gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-base font-bold text-[#0B1730] sm:text-lg">
            Order #SH-10245
          </h2>
          <p className="mt-1 text-xs text-[#64748B] sm:text-sm">
            Placed on October 4, 2026
          </p>
        </div>

        <span className="w-fit rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700 sm:text-sm">
          Delivered
        </span>
      </div>

      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F8FAFC] p-2 sm:h-24 sm:w-24">
              <img
                src={Logo}
                alt="Wireless Headphones"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-semibold text-[#0B1730] sm:text-base">
                Wireless Headphones
              </h3>
              <p className="mt-1 text-xs text-[#64748B]">Brand: Sony</p>
              <p className="mt-1 text-xs text-[#64748B]">Quantity: 1</p>
            </div>
          </div>
          <p className="font-bold text-[#FF5A36] sm:text-right">Rs. 2,499</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F8FAFC] p-2 sm:h-24 sm:w-24">
              <img
                src={Logo}
                alt="Running Shoes"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-semibold text-[#0B1730] sm:text-base">
                Running Shoes
              </h3>
              <p className="mt-1 text-xs text-[#64748B]">Brand: Nike</p>
              <p className="mt-1 text-xs text-[#64748B]">Quantity: 2</p>
            </div>
          </div>
          <p className="font-bold text-[#FF5A36] sm:text-right">Rs. 7,998</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-t border-[#E2E8F0] p-4 sm:grid-cols-2 sm:p-6">
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#0B1730]">
            Payment Information
          </h3>
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-[#64748B]">Payment Method</span>
            <span className="text-right font-medium text-[#0B1730]">
              Cash on Delivery
            </span>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-[#64748B]">Payment Status</span>
            <span className="font-medium text-green-600">Paid</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#0B1730]">Delivery Address</h3>
          <p className="text-sm leading-6 text-[#64748B]">
            Muhammad Tahir
            <br />
            Rahim Yar Khan, Punjab, Pakistan
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="text-sm text-[#64748B]">
          Total items: <span className="font-semibold text-[#0B1730]">3</span>
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-sm font-medium text-[#64748B]">
            Order Total
          </span>
          <span className="text-xl font-bold text-[#FF5A36]">Rs. 10,497</span>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
