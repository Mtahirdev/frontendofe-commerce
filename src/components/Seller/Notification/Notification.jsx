import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import {
  FaMessage,
  FaMoneyBillWave,
  FaRotateLeft,
  FaBoxOpen,
  FaCheck,
} from "react-icons/fa6";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "You received a new order for Nike Air Max Shoes.",
    time: "5 minutes ago",
    unread: true,
    icon: FaShoppingBag,
    iconBg: "bg-orange-100 text-orange-600",
  },
  {
    id: 2,
    type: "message",
    title: "New Customer Message",
    message: "Ali sent you a message about your product.",
    time: "20 minutes ago",
    unread: true,
    icon: FaMessage,
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Received",
    message: "Rs. 4,500 payment has been received for Order #ORD1025.",
    time: "1 hour ago",
    unread: false,
    icon: FaMoneyBillWave,
    iconBg: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    type: "refund",
    title: "Refund Requested",
    message: "Customer requested a refund for Order #ORD1020.",
    time: "3 hours ago",
    unread: false,
    icon: FaRotateLeft,
    iconBg: "bg-red-100 text-red-600",
  },
  {
    id: 5,
    type: "stock",
    title: "Low Stock Alert",
    message: "Nike Air Max Shoes has only 3 items remaining.",
    time: "Yesterday",
    unread: false,
    icon: FaBoxOpen,
    iconBg: "bg-yellow-100 text-yellow-700",
  },
];

let Notifications = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1730] sm:text-3xl">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Stay updated with your store activity
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-lg bg-[#0B1730] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#162442]">
          <FaCheck />
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              key={notification.id}
              className={`flex gap-4 border-b border-slate-100 p-4 transition hover:bg-slate-50 sm:p-5 ${
                notification.unread ? "bg-orange-50/40" : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${notification.iconBg}`}
              >
                <Icon />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3
                    className={`text-sm sm:text-base ${
                      notification.unread
                        ? "font-bold text-[#0B1730]"
                        : "font-semibold text-slate-700"
                    }`}
                  >
                    {notification.title}
                  </h3>

                  <span className="shrink-0 text-xs text-slate-400">
                    {notification.time}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {notification.message}
                </p>
              </div>

              {/* Unread indicator */}
              {notification.unread && (
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF5A36]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
