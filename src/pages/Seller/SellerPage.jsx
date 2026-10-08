import React from "react";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";
import SearchBar from "../../components/Seller/Products/SearchBar.jsx";
import ProductGrid from "../../components/Seller/Products/ProductGrid.jsx";

const SellerPage = () => {
  return (
    <div className="lg:flex lg:w-full  flex flex-col lg:flex-row lg:justify-center bg-[#F1F5F9] lg:h-fit lg:overflow-scroll ">
      <div className="w-full lg:w-[30%] desk:w-[22%]">
        <Navbar></Navbar>
      </div>
      <div className="w-full lg:w-[70%] desk:w-[78%] flex flex-col  justify-center items-center h-fit bg-[#F1F5F9] lg:h-fit gap-4 pt-5">
        <h1 className="text-3xl text-[#0B1730]">Products</h1>
        <SearchBar></SearchBar>
        <ProductGrid></ProductGrid>
        {/* <AddProductForm></AddProductForm> */}
      </div>
    </div>
  );
};

export default SellerPage;
