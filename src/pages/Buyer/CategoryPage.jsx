import React from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar";
import Navbar from "../../components/Buyer/Navbar components/Navbar";
import SecondFooter from "../../components/Buyer/SecondFooter";
import Footer from "../../components/Buyer/Footer";
import CategoryMain from "../../components/Buyer/Category/CategoryMain.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";

const CategoryPage = () => {
  return (
    <>
      <div>
        <div>
          <div className="overflow-x-hidden">
            <Upper_Navbar />
            <Navbar></Navbar>
            <SideBar></SideBar>

            <div className="pt-20 pb-20 md:pt-24 md:pb-5">
              <CategoryMain></CategoryMain>
              <SecondFooter></SecondFooter>
              <Footer></Footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
