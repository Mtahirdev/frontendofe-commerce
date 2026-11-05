import React from "react";
import { Form } from "react-router-dom";
import cashondelivery from "../../../../assets/cashondelivery.png";

const CashOnDelivery = ({ collectData }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h1 className="font-bold text-2xl text-ink-800">
          Cash On Delivery (COD)
        </h1>
        <p className="text-ink-500 w-[85%]">
          Pay in cash when you receive your order at your doorstep.
        </p>
        <img
          src={cashondelivery}
          className="w-28 h-28 object-contain"
          alt="Cash on delivery"
        />
      </div>

      <Form
        onSubmit={(e) => e.preventDefault()}
        onChange={(e) => collectData({ target: e.currentTarget })}
        className="flex flex-col gap-2 mt-3"
      >
        <label htmlFor="dec" className="text-sm font-medium text-ink-500">
          Delivery Instruction (optional)
        </label>
        <textarea
          name="dec"
          id="dec"
          rows={3}
          placeholder="E.g. Call before delivery. Leave at gate, etc."
          className="w-full px-4 py-3 bg-white border border-ink-200 rounded-xl text-ink-800 placeholder:text-ink-400 resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </Form>
    </div>
  );
};

export default CashOnDelivery;
