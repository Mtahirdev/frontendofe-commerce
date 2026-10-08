import React from "react";
import women from "../../assets/women.jfif";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar";
import Navbar from "../../components/Buyer/Navbar components/Navbar";
import SecondFooter from "../../components/Buyer/SecondFooter";
import Footer from "../../components/Buyer/Footer";
import Cart from "../../components/Buyer/Cart components/Cart.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const Cartpage = () => {
  return (
    <>
      <div>
        <div className="overflow-x-hidden">
          <Upper_Navbar />
          <Navbar></Navbar>
          <SideBar></SideBar>
          <div className="pt-20 pb-20 md:pt-24 md:pb-5">
            <Cart></Cart>
            <SecondFooter></SecondFooter>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartpage;
