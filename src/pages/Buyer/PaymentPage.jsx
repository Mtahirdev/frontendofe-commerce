import React from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar";
import Navbar from "../../components/Buyer/Navbar components/Navbar";
import SecondFooter from "../../components/Buyer/SecondFooter";
import Footer from "../../components/Buyer/Footer";
import PaymentMain from "../../components/Buyer/Payment/PaymentMain.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const PaymentPage = () => {
  return (
    <>
      <div>
        <div className="overflow-x-hidden">
          <Upper_Navbar />
          <Navbar></Navbar>
          <SideBar></SideBar>

          <div className="pt-16 pb-20 md:pt-16 md:pb-5">
            <PaymentMain></PaymentMain>
            <SecondFooter></SecondFooter>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
