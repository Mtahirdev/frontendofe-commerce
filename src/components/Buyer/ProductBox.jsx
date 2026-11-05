import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { BuyerCartFetchItem, BuyerFetchItem } from "../../server/server.js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  SetCartArray,
  SetProductArray,
} from "../../store/feature/ProductsData.js";

const ProductBox = () => {
  let { token } = useSelector((state) => state.userstore);
  let { productarr } = useSelector((state) => state.productstore);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    BuyerFetchItem(token).then((res) => {
      try {
        if (res.msg_login) {
          toast.error("please login");
          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
        } else if (res.msg_signup) {
          toast.error("please signup");
          setTimeout(() => {
            navigate("/auth/signup");
          }, 3000);
        } else if (res.msgerr) {
          toast.error("please try again later");
        } else {
          dispatch(SetProductArray(res.products));
        }
      } catch (error) {
        console.log(error);
        toast.error("please try again later");
      }
    });
    BuyerCartFetchItem(token).then((res) => {
      try {
        if (res.msg_login) {
          toast.error("please login");
          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
        } else if (res.msg_signup) {
          toast.error("please signup");
          setTimeout(() => {
            navigate("/auth/signup");
          }, 3000);
        } else if (res.msg_succes) {
          dispatch(SetCartArray(res.item));
          // setTimeout(() => {
          //   navigate("/buyer/cart");
          // }, 3000);
        } else {
          toast.error("try again later");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  return (
    <>
      <div className="mt-6">
        <h1 className="ml-3 font-extrabold capitalize text-3xl text-ink-800">
          Products
        </h1>
        <p className="ml-3 capitalize text-ink-500">
          handpicked products just for you
        </p>
        <div className="flex justify-center items-center w-screen ">
          <div className="grid grid-cols-1  w-[95%]  h-fit    pt-4 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productarr?.map((ele) => (
              <ProductCard key={ele._id} product={ele} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-4 pb-5">
        <button className="font-semibold border-2 border-brand-600 text-brand-600 rounded-2xl px-6 py-2 hover:bg-brand-600 hover:text-white transition-colors">
          Show More
        </button>
      </div>
    </>
  );
};

export default ProductBox;
