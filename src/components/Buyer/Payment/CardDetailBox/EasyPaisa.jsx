import React, { useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import easypaisa from "../../../../assets/easypaisa.png";

const EasyPaisa = ({ collectData }) => {
  const [saved, setsaved] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    collectData(e);
    setsaved(true);
    toast.success("Easypaisa number added");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h1 className="font-bold text-2xl text-ink-800">Easypaisa Detail</h1>
        <p className="text-ink-500 w-[85%]">
          Enter your Easypaisa mobile number to proceed
        </p>
        <img
          src={easypaisa}
          className="w-28 h-28 object-contain"
          alt="Easypaisa"
        />
      </div>

      <Form
        onSubmit={onSubmit}
        onChange={() => setsaved(false)}
        className="flex flex-col gap-3 mt-3"
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="mobile-number"
            className="text-sm font-medium text-ink-500"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile-number"
            id="mobile-number"
            inputMode="numeric"
            maxLength={11}
            pattern="03[0-9]{9}"
            required
            placeholder="03XX XXXXXXX"
            className="w-full px-4 py-3 bg-white border border-ink-200 rounded-xl text-ink-800 placeholder:text-ink-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

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

      <p className="mt-3 text-sm text-center text-ink-500">
        Please enter a correct mobile number
      </p>
    </div>
  );
};

export default EasyPaisa;
