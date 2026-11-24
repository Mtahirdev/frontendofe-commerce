import React, { useEffect } from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar.jsx";
import Navbar from "../../components/Buyer/Navbar components/Navbar.jsx";
import Banner from "../../components/Buyer/Banner.jsx";
import Category from "../../components/Buyer/Category.jsx";
import ProductBox from "../../components/Buyer/ProductBox.jsx";
import SecondFooter from "../../components/Buyer/SecondFooter.jsx";
import Footer from "../../components/Buyer/Footer.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { socket } from "../../utils/utils.js";
import { useSelector } from "react-redux";
import InsideBrand from "../../components/Buyer/InsideBrand.jsx";
import Trending from "../../components/Buyer/Trending.jsx";
import Phone from "../../components/Buyer/Phone.jsx";
import ProductGridOne from "../../components/Buyer/ProductGridOne.jsx";
import FlashSale from "../../components/Buyer/FlashSale.jsx";
import ShopByCategory from "../../components/Buyer/ShopByCategory.jsx";
import NewArrivals from "../../components/Buyer/NewArrivals.jsx";
const Homepage = () => {
  let { user, verified, type } = useSelector((state) => state.userstore);

  if (verified && type !== "auth") {
    useEffect(() => {
      socket.io.opts.query = {
        userId: user?._id,
      };

      socket.connect();

      socket.on("getOnlineUsers", (data) => {
        console.log(data);
      });

      return () => socket.close();
    }, []);
  }
  return (
    <>
      <div className="bg-ink-50">
        <div className="overflow-x-hidden">
          <Upper_Navbar />
          <Navbar></Navbar>
          <SideBar></SideBar>

          <div className="pt-20 pb-20 md:pt-24 md:pb-5">
            <Banner></Banner>
            <Trending></Trending>
            <ProductGridOne></ProductGridOne>
            <Phone></Phone>
            <FlashSale></FlashSale>
            {/* <ShopByCategory></ShopByCategory> */}
            {/* <NewArrivals></NewArrivals> */}

            <Category></Category>
            <ProductBox></ProductBox>
            <InsideBrand></InsideBrand>
            <SecondFooter></SecondFooter>
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
