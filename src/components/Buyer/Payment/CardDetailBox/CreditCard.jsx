import React, { useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";

const detail = [
  {
    id: "card-number",
    type: "text",
    text: "Card Number",
    placeholder: "1234 5678 9012 3456",
    inputMode: "numeric",
    maxLength: 19,
  },
  {
    id: "holder-name",
    type: "text",
    text: "Card Holder Name",
    placeholder: "Name on card",
  },
  { id: "expiry-date", type: "month", text: "Expiry Date" },
  {
    id: "cvv",
    type: "password",
    text: "CVV",
    placeholder: "•••",
    inputMode: "numeric",
    maxLength: 4,
  },
];

const CreditCard = ({ collectData }) => {
  const [saved, setsaved] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    collectData(e);
    setsaved(true);
    toast.success("Card detail added");
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-center text-ink-800">
        Card Detail
      </h1>

      <Form
        onSubmit={onSubmit}
        onChange={() => setsaved(false)}
        className="flex flex-col gap-4 mt-4"
      >
        {detail.map((ele) => (
          <div key={ele.id} className="flex flex-col gap-1">
            <label
              htmlFor={ele.id}
              className="text-sm font-medium text-ink-500"
            >
              {ele.text}
            </label>
            <input
              type={ele.type}
              name={ele.id}
              id={ele.id}
              required
              placeholder={ele.placeholder}
              inputMode={ele.inputMode}
              maxLength={ele.maxLength}
              autoComplete="off"
              className="w-full px-4 py-3 bg-white border border-ink-200 rounded-xl text-ink-800 placeholder:text-ink-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        ))}

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold transition ${
            saved
              ? "bg-success-50 text-success-600"
              : "bg-brand-600 hover:bg-brand-700 text-white"
          }`}
        >
          {saved ? "✓ Detail added" : "Add Detail"}
        </button>
      </Form>
    </div>
  );
};

export default CreditCard;
