import React from "react";
import AddProductEditForm from "../../components/Seller/AddProductForm/AddProductEditForm.jsx";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";

const SellerEditProductPage = () => {
  return (
    <div className="lg:flex lg:w-full lg:h-full flex flex-col lg:flex-row lg:justify-center bg-[#F1F5F9] ">
      <div className="w-full lg:w-[30%] desk:w-[22%]">
        <Navbar></Navbar>
      </div>
      <div className="w-full lg:w-[70%] desk:w-[78%] flex flex-col  justify-center items-center h-fit bg-[#F1F5F9] lg:h-fit gap-4 pt-5">
        <h1 className="text-3xl text-[#0B1730]">Edit Products</h1>
        <AddProductEditForm></AddProductEditForm>
      </div>
    </div>
  );
};

export default SellerEditProductPage;
