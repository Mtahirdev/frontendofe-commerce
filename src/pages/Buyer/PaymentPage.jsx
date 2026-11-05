import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar";
import Navbar from "../../components/Buyer/Navbar components/Navbar";
import SecondFooter from "../../components/Buyer/SecondFooter";
import Footer from "../../components/Buyer/Footer";
import PaymentMain from "../../components/Buyer/Payment/PaymentMain.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const PaymentPage = () => {
  return (
    <div className="overflow-x-hidden bg-ink-50 min-h-screen text-ink-800">
      <ToastContainer position="top-right" autoClose={3000} />
      <Upper_Navbar />
      <Navbar />
      <SideBar />

      <div className="pt-20 pb-20 md:pt-24 md:pb-5">
        <PaymentMain />
        <SecondFooter />
        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
