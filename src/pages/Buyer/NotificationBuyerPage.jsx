import React from "react";
import Notifications from "../../components/Seller/Notification/Notification.jsx";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar.jsx";
import Navbar from "../../components/Buyer/Navbar components/Navbar.jsx";
import SecondFooter from "../../components/Buyer/SecondFooter.jsx";
import Footer from "../../components/Buyer/Footer.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const NotificationBuyerPage = () => {
  return (
    <div>
      <div className="overflow-x-hidden">
        <Upper_Navbar />
        <Navbar></Navbar>
        <SideBar></SideBar>

        <div className="pt-16 pb-20 md:pt-16 md:pb-5">
          <Notifications></Notifications>
          <SecondFooter></SecondFooter>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};
export default NotificationBuyerPage;
