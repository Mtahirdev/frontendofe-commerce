import React from "react";
import { Form } from "react-router-dom";

const CreditCard = ({ collectData }) => {
  let detail = [
    { id: "card-number", type: "number", text: "Card Number" },
    { id: "holder-name", type: "text", text: "Card Holder Name" },
    { id: "expiry-date", type: "date", text: "Expiry Date" },
    { id: "cvv", type: "number", text: "CVV" },
  ];
  return (
    <>
      <div>
        <h1 className="font-bold text-2xl text-center mt-1">Card Detail</h1>
        <Form
          onSubmit={collectData}
          className="w-full h-fit flex flex-col gap-4 lg:gap-2 mt-3 "
        >
          {detail.map((ele, index) => {
            return (
              <div key={index} className="ml-2 flex flex-col gap-2">
                <label
                  htmlFor={ele.id}
                  className="font-bold text-2xl lg:text-[20px]"
                >
                  {ele.text}
                </label>
                <input
                  type={ele.type}
                  name={ele.id}
                  id={ele.id}
                  className="border-2 border-gray-300 rounded-[10px] w-[80%] pt-1 pb-1"
                />
              </div>
            );
          })}
          <button
            type="submit"
            className="px-5 py-1 rounded-2xl bg-blue-500 hover:bg-blue-400"
          >
            Add Detail
          </button>
        </Form>
      </div>
    </>
  );
};

export default CreditCard;
