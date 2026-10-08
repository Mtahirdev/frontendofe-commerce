import React, { useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import { useDispatch, useSelector } from "react-redux";
import { FetchItem } from "../../../server/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SetProductArray } from "../../../store/feature/ProductsData";

const ProductGrid = () => {
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  let [err, seterr] = useState(true);
  let dispatch = useDispatch();
  let { token } = useSelector((state) => state.userstore);
  let { productarr } = useSelector((state) => state.productstore);
  useEffect(() => {
    FetchItem(token).then((res) => {
      console.log(res);

      try {
        if (res.msg_login) {
          setloading(false);

          toast.error("please login");
          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
        } else if (res.msg_signup) {
          setloading(false);

          toast.error("please signup");
          setTimeout(() => {
            navigate("/auth/signup");
          }, 3000);
        } else if (res.msgerr) {
          setloading(false);

          toast.error("please try again later");
        } else {
          setloading(false);
          seterr(false);
          dispatch(SetProductArray(res.products));
        }
      } catch (error) {
        console.log(error);
        setloading(false);
        seterr(true);
        toast.error("please try again later");
      }
    });
  }, []);
  return (
    <>
      {loading && (
        <>
          <div className="fixed z-50 w-full h-full inset-0 bg-black/50 flex justify-center items-center text-2xl md:text-3xl lg:text-4xl">
            <div className="grid grid-cols-2 w-10 h-10  animate-bounce">
              <div className="bg-blue-500 w-9 h-9 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="fixed z-50 w-full h-full inset-0 bg-black/50 flex justify-center items-center text-2xl md:text-3xl lg:text-4xl">
            <div className="grid grid-cols-2 w-10 h-10  animate-bounce">
              <div className="bg-green-500 w-9 h-9 rounded-full animate-pulse"></div>
            </div>
          </div>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      {err == true ? (
        <div className="w-[90%]  grid grid-cols-1 gap-4 md:grid-cols-2 h-fit">
          <h1 className="text-2xl text-black text-center">
            Failed to fetch item
          </h1>
        </div>
      ) : (
        <div className="w-[90%]  grid grid-cols-1 gap-4 md:grid-cols-2 h-fit">
          {productarr.map((ele, index) => {
            return <ProductBox key={index} product={ele}></ProductBox>;
          })}
        </div>
      )}
    </>
  );
};

export default ProductGrid;
