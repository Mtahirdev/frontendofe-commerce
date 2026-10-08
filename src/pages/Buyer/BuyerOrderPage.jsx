import React from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar.jsx";
import Navbar from "../../components/Buyer/Navbar components/Navbar.jsx";
import SecondFooter from "../../components/Buyer/SecondFooter.jsx";
import Footer from "../../components/Buyer/Footer.jsx";
import { useSelector } from "react-redux";
import OrderGridBuyer from "../../components/Buyer/Order/OrderGridBuyer.jsx";
import SearchBarBuyer from "../../components/Buyer/SearchBarBuyer.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const BuyerOrderPage = () => {
  return (
    <div>
      <div className="overflow-x-hidden">
        <Upper_Navbar />
        <Navbar></Navbar>
        <SideBar></SideBar>
        <div className="pt-20 pb-20 md:pt-24 md:pb-5">
          <SearchBarBuyer></SearchBarBuyer>
          <OrderGridBuyer></OrderGridBuyer>
          <SecondFooter></SecondFooter>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default BuyerOrderPage;
