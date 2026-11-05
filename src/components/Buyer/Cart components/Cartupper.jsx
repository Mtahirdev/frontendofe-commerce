import React, { useEffect } from "react";
import CartProduct from "./CartProduct.jsx";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import { MdOutlineDiscount } from "react-icons/md";
import Cartlower from "./Cartlower.jsx";
import { BuyerCartFetchItem } from "../../../server/server.js";
import { useDispatch, useSelector } from "react-redux";
import { SetCartArray } from "../../../store/feature/ProductsData.js";
const Cartupper = () => {
  let { token } = useSelector((state) => state.userstore);
  let { cartarr } = useSelector((state) => state.productstore);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
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
        } else {
          toast.error("try again later");
        }
      } catch (error) {
        console.log(error);
        toast.error("try again later");
      }
    });
  }, []);
  return (
    <div className="w-full mx-auto">
      <div className="mt-4">
        <h1 className="text-2xl font-bold ml-[5%] text-ink-800">
          Your Cart <span className="text-brand-600">({cartarr.length})</span>
        </h1>
        <p className="ml-[5%] text-ink-500">
          Review your items and proceed to checkout
        </p>
      </div>

      <div className="flex flex-col pb-5 items-center justify-center">
        <div className="flex flex-col justify-center items-center text-center w-full">
          <div className="w-[90%] h-fit scrollbar-none place-items-center grid grid-cols-1 gap-3 py-4 px-3">
            {cartarr?.map((ele) => (
              <CartProduct key={ele._id} product={ele} />
            ))}
          </div>
        </div>

        {/* Coupon box */}
        <div className="w-full flex flex-col">
          <div className="flex w-[90%] bg-white border border-ink-200 rounded-2xl shadow-sm gap-2 mt-2 mx-auto items-center flex-col p-5 mb-5 sm:w-[80%] md:w-[90%] lg:w-[50%]">
            <div className="flex items-center gap-3 w-full">
              <div className="p-2.5 rounded-full bg-brand-50 text-brand-600">
                <MdOutlineDiscount className="text-2xl" />
              </div>
              <div className="text-left">
                <h1 className="font-bold capitalize text-ink-800">
                  have a coupon code?
                </h1>
                <p className="text-sm text-ink-500 capitalize">
                  apply it for extra savings
                </p>
              </div>
            </div>
            <Form className="flex gap-2 w-full mt-2">
              <input
                type="text"
                name="coupen"
                id="coupen"
                className="flex-1 min-w-0 px-3 py-2 bg-ink-50 border border-ink-200 rounded-xl text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                placeholder="Enter coupon code"
              />
              <button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2 rounded-xl transition-colors">
                Apply
              </button>
            </Form>
          </div>
        </div>

        <Cartlower />
      </div>
    </div>
  );
};

export default Cartupper;
