import React from "react";
import jazzcash from "../.../../../../../assets/jazzcash.png";
import { Form } from "react-router-dom";

const JazzCash = ({ collectData }) => {
  return (
    <>
      <div className="w-full h-fit">
        <div className="w-full h-fit flex flex-col gap-4 lg:gap-2 items-center justify-center">
          <h1 className="font-bold text-2xl text-center mt-1">
            Jazz Cash Detail
          </h1>
          <p className="font-bold w-[80%] text-center">
            Enter your JazzCash mobile number to proceed
          </p>
          <img src={jazzcash} className="w-36 h-40 lg:w-30 lg:h-30 " alt="" />
        </div>
        <Form onSubmit={collectData}>
          <label htmlFor="mobile-number" className="font-bold text-[20px] ml-3">
            Mobile Number
          </label>
          <input
            type="number"
            name="mobile-number"
            id="mobile-number"
            className="pt-1 pb-1 w-[80%]  ml-3 rounded-[10px]"
          />
          <button
            type="submit"
            className="px-5 py-1 rounded-2xl bg-blue-500 hover:bg-blue-400"
          >
            Add Detail
          </button>
        </Form>
        <p className="font-bold mt-3 w-[80%] text-center ml-5 text-[20px]">
          Please enter a correct mobile number
        </p>
      </div>
    </>
  );
};

export default JazzCash;
