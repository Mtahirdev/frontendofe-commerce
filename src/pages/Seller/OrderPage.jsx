import React from "react";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";
import SearchBar from "../../components/Seller/Products/SearchBar.jsx";
import OrderGrid from "../../components/Seller/Order/OrderGrid.jsx";

const OrderPage = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center bg-ink-100 min-h-screen text-ink-800">
      <div className="w-full lg:w-[30%] desk:w-[22%]">
        <Navbar />
      </div>

      <div className="w-full lg:w-[70%] desk:w-[78%] flex flex-col items-center gap-4 px-4 pt-5 pb-10">
        <div className="w-[95%]">
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-800">
            Orders
          </h1>
          <p className="text-sm text-ink-500">
            Orders placed by customers for your products
          </p>
        </div>
        <SearchBar />
        <div className="w-[95%]">
          <OrderGrid />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
