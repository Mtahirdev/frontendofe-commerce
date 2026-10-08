import React from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar.jsx";
import Navbar from "../../components/Buyer/Navbar components/Navbar.jsx";
import Banner from "../../components/Buyer/Banner.jsx";
import Category from "../../components/Buyer/Category.jsx";
import ProductBox from "../../components/Buyer/ProductBox.jsx";
import SecondFooter from "../../components/Buyer/SecondFooter.jsx";
import Footer from "../../components/Buyer/Footer.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const Homepage = () => {
  return (
    <div>
      <div className="overflow-x-hidden">
        <Upper_Navbar />
        <Navbar></Navbar>
        <SideBar></SideBar>

        <div className="pt-20 pb-20 md:pt-24 md:pb-5">
          <Banner></Banner>
          <Category></Category>
          <ProductBox></ProductBox>
          <SecondFooter></SecondFooter>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
