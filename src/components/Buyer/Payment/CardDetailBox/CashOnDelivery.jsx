import React from "react";
import { Form } from "react-router-dom";
import cashondelivery from "../../../../assets/cashondelivery.png";

const CashOnDelivery = () => {
  return (
    <>
      <div className="w-full h-fit">
        <div className="w-full h-fit flex flex-col gap-4 lg:gap-2 items-center justify-center">
          <h1 className="font-bold text-2xl text-center mt-1">
            Cash On Delivery (COD)
          </h1>
          <p className="font-bold w-[80%] text-center">
            Pay in cash when you receive your order at your doorstep.
          </p>
          <img
            src={cashondelivery}
            className="w-36 h-40 lg:w-30 lg:h-30 "
            alt=""
          />
        </div>
        <Form className="flex flex-col gap-1 items-center">
          <label htmlFor="dec" className="font-bold text-[20px] ml-3">
            Delivery Instruction (optional)
          </label>
          <textarea
            type="text"
            placeholder="E.g. Call before delivery. Leave at gate, etc."
            name="dec"
            id="dec"
            rows={3}
            className="pt-1 pb-1 w-[90%]  rounded-[10px] placeholder:w-[90%] placeholder:text-center "
          />
        </Form>
      </div>
    </>
  );
};

export default CashOnDelivery;
