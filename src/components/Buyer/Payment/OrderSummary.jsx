import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoIosAlert } from "react-icons/io";
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ pushData }) => {
  let navigate = useNavigate();
  let { cartarr } = useSelector((s) => s.productstore);
  console.log(cartarr);

  let arr = cartarr.map((ele) => {
    let a = ele.price * (ele.discount / 100);
    return ele.price - a;
  });

  let value = arr.reduce((prev, cur, index) => {
    return cur + prev;
  });

  let shipping = 200;

  if (value > 4000) {
    shipping = 0;
  }

  let total = value + shipping;
  return (
    <>
      <div className="w-[95%] md:w-[90%] h-fit md:h-110 lg:h-fit pb-3 border-2 border-green-700 md:row-start-2 md:col-span-2 md:col-start-2 lg:col-span-1 lg:row-start-1 lg:col-start-3 flex justify-center rounded-2xl shadow-2xl shadow-gray-300">
        <div className="flex flex-col w-[90%]   h-fit  mt-2      ">
          <h1 className="text-2xl font-bold text-center">Order Summary</h1>
          <div className="flex w-full gap-28 ml-3 mt-2">
            <h1 className="font-bold">
              Subtotal <span>({cartarr.length})</span>
            </h1>
            <h1 className="font-bold">Rs:{value}</h1>
          </div>
          <div className="flex w-full  ml-3 mt-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-bold">shipping</h1>
                <h1 className="font-bold">
                  <IoIosAlert className="mt-1 font-bold" />
                </h1>
              </div>
              <p className="font-bold mt-2">Free shipping over Rs:4000</p>
            </div>
            <div className="font-bold ml-2">Rs:{shipping}</div>
          </div>
          <div className="flex w-full gap-32 ml-3 mt-2">
            <h1 className="font-bold">Discount</h1>
            <h1 className="font-bold"> -Rs:0</h1>
          </div>
          <div className="font-bold bg-gray-400 w-[90%] h-0.5 rounded-full mt-2 mx-auto pb-1 mb-2"></div>
          <div className="flex w-full  ml-3 ">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl ">Total</h1>
              </div>
            </div>
            <div className="font-bold ml-16 mt-1">{total}</div>
          </div>
          <button
            onClick={pushData}
            className="text-2xl text-white bg-purple-500 pb-1 pt-1 pl-2 pr-2 w-[90%]  mx-auto mt-1 rounded-2xl capitalize mb-2"
          >
            Order Confirmed
          </button>
          <p className="w-[85%] font-bold text-center ml-4 mt-4 lg:mt-2 lg:text-[16px] text-[18px]">
            By placing this order,you agree our{" "}
            <a href="" className="text-blue-600">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a className="text-blue-600" href="">
              Privacy
            </a>
          </p>
          <p className="w-[85%] text-center text-red-400">
            Please check the address in profile section
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
