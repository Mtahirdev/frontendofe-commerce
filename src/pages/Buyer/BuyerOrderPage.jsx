import React from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar.jsx";
import Navbar from "../../components/Buyer/Navbar components/Navbar.jsx";
import SecondFooter from "../../components/Buyer/SecondFooter.jsx";
import Footer from "../../components/Buyer/Footer.jsx";
import OrderGridBuyer from "../../components/Buyer/Order/OrderGridBuyer.jsx";
import SearchBarBuyer from "../../components/Buyer/SearchBarBuyer.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const BuyerOrderPage = () => {
  return (
    <div className="overflow-x-hidden bg-ink-50 min-h-screen text-ink-800">
      <Upper_Navbar />
      <Navbar />
      <SideBar />
      <div className="pt-20 pb-20 md:pt-24 md:pb-5">
        <div className="mt-4 mb-4 ml-[5%]">
          <h1 className="text-2xl font-bold text-ink-800">My Orders</h1>
          <p className="text-ink-500">Track and manage your orders</p>
        </div>
        <SearchBarBuyer />
        <OrderGridBuyer />
        <SecondFooter />
        <Footer />
      </div>
    </div>
  );
};

export default BuyerOrderPage;
