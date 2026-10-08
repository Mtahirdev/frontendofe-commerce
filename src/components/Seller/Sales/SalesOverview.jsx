import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import {
  FaMoneyBillWave,
  FaBoxOpen,
  FaWallet,
  FaClock,
  FaRotateLeft,
} from "react-icons/fa6";

const salesOverview = [
  {
    title: "Total Sales",
    value: "Rs. 245,800",
    description: "Total order value",
    icon: FaMoneyBillWave,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Total Orders",
    value: "186",
    description: "Orders received",
    icon: FaShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Items Sold",
    value: "324",
    description: "Total units sold",
    icon: FaBoxOpen,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Net Earnings",
    value: "Rs. 218,400",
    description: "After platform fees",
    icon: FaWallet,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Payments",
    value: "Rs. 18,500",
    description: "Awaiting settlement",
    icon: FaClock,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Refunds",
    value: "Rs. 8,900",
    description: "Total refunded amount",
    icon: FaRotateLeft,
    color: "bg-red-100 text-red-600",
  },
];

let SalesOverview = () => {
  return (
    <section className="w-[90%] h-screen space-y-5">
      <div>
        <h2 className="text-xl font-bold text-[#0B1730] sm:text-2xl">
          Sales Overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your complete sales performance and payment summary
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {salesOverview.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-3  text-2xl font-bold text-[#0B1730] sm:text-3xl">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon className="text-xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SalesOverview;
