import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const SecondFooter = () => {
  return (
    <>
      <div className="flex flex-col  gap-3 sm:grid sm:grid-cols-2 desk:grid-cols-4 justify-items-center">
        <div className="flex justify-evenly ">
          <div>
            <CiDeliveryTruck className="text-7xl" />
          </div>
          <div className="mt-4">
            <h1 className="font-extrabold">Free Shiping</h1>
            <p>on order over Rs:400</p>
          </div>
        </div>
        <div className="flex justify-evenly ">
          <div>
            <RiSecurePaymentLine className="text-7xl" />
          </div>
          <div className="mt-4">
            <h1 className="font-extrabold">Secure Payment</h1>
            <p>100% secure payment</p>
          </div>
        </div>
        <div className="flex justify-evenly ">
          <div>
            <PiArrowsCounterClockwiseLight className="text-7xl" />
          </div>
          <div className="mt-4">
            <h1 className="font-extrabold">Easy Return</h1>
            <p>30 days return policy</p>
          </div>
        </div>
        <div className="flex justify-evenly gap-3 ">
          <div>
            <TfiHeadphoneAlt className="text-6xl" />
          </div>
          <div className="mt-4">
            <h1 className="font-extrabold">24/7 Support</h1>
            <p>dedicated support</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondFooter;
