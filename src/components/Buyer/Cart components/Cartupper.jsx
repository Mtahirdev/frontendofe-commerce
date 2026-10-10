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
    <div className="w-full  mx-auto">
      <div>
        <h1 className="text-2xl font-bold ml-[5%]">
          Your Cart <span>(45)</span>
        </h1>
        <p className="ml-[5%] font-bold">
          Review you item and process to checkout
        </p>
      </div>
      <div className="flex flex-col pb-5 items-center justify-center">
        <div className="flex flex-col justify-center items-center text-center w-full h-[80%]">
          <div className="w-[90%] h-fit  scrollbar-none place-items-center grid grid-cols-1 grid-rows-1 gap-2 lg:gap-3 pb-10  pr-3 pl-3 overflow-scroll">
            {cartarr?.map((ele, index) => {
              return <CartProduct key={ele._id} product={ele} />;
            })}
          </div>
        </div>
        <div className="w-full h-full flex flex-col  ">
          <div className="flex w-[90%]  border border-gray-400 gap-2 mt-5 mx-auto items-center flex-col pb-5 mb-5 sm:w-[80%] md:w-[90%] lg:w-[50%]">
            <div className="flex items-center">
              <div className="">
                <MdOutlineDiscount className="text-2xl" />
              </div>
              <div className=" w-[90%]">
                <h1 className="font-bold capitalize">have a coupen code?</h1>
                <p className="font-bold capitalize">
                  apply it for extara saving
                </p>
              </div>
            </div>
            <Form className="flex justify-evenly w-full mt-2">
              <input
                type="text"
                name="coupen"
                id="coupen"
                className="w-[45vw] lg:w-[25vw]"
                placeholder="Enter coupon code"
              />
              <button className="bg-purple-500 text-white pt-1 pb-1 pl-2 pr-2 rounded-2xl sm:pl-4 sm:pr-4">
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
