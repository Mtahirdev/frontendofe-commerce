import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowBack } from "react-icons/io";
import AddProductEditForm from "../../components/Seller/AddProductForm/AddProductEditForm.jsx";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";

const SellerEditProductPage = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center bg-ink-100 min-h-screen text-ink-800">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full lg:w-[30%] desk:w-[22%]">
        <Navbar />
      </div>

      <div className="w-full lg:w-[70%] desk:w-[78%] flex flex-col items-center gap-4 px-4 pt-5">
        <div className="w-[90%]">
          <Link
            to="/seller"
            className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-ink-500 transition-colors hover:text-brand-600"
          >
            <IoIosArrowBack /> Back to products
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-800">
            Edit Product
          </h1>
          <p className="text-sm text-ink-500">
            Update the details of this item
          </p>
        </div>
        <AddProductEditForm />
      </div>
    </div>
  );
};

export default SellerEditProductPage;
