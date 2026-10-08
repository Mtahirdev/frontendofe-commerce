import React from "react";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";
import SearchBar from "../../components/Seller/Products/SearchBar.jsx";
import OrderGrid from "../../components/Seller/Order/OrderGrid.jsx";

const OrderPage = () => {
  return (
    <div className="lg:flex lg:w-full lg:h-full flex flex-col lg:flex-row lg:justify-center bg-[#F1F5F9] ">
      <div className="w-full lg:w-[30%] desk:w-[22%]">
        <Navbar></Navbar>
      </div>
      <div className="w-full lg:w-[70%] desk:w-[78%] flex flex-col  justify-center items-center h-fit bg-[#F1F5F9] lg:h-fit gap-4 pt-5">
        <h1 className="text-3xl text-[#0B1730]">Order</h1>
        <SearchBar></SearchBar>
        <OrderGrid></OrderGrid>
      </div>
    </div>
  );
};

export default OrderPage;
