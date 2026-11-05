import React from "react";
import credit from "../../../assets/credit-card.png";
import easypaisa from "../../../assets/easypaisa.png";
import jazzcash from "../../../assets/jazzcash.png";
import cashon from "../../../assets/cashondelivery.png";

const methodtoSelect = [
  {
    Name: "Credit/Debt Card",
    id: "inputA",
    icon: credit,
    dec: "pay using your card",
  },
  {
    Name: "Easypaisa",
    id: "inputB",
    icon: easypaisa,
    dec: "pay using your easypaisa account",
  },
  {
    Name: "Jazz Cash",
    id: "inputC",
    icon: jazzcash,
    dec: "pay using your JazzCash account",
  },
  {
    Name: "Cash On Delivery",
    id: "inputD",
    icon: cashon,
    dec: "pay when you receive your order",
  },
];

const SelectPaymentCard = ({ method, setmethod }) => {
  return (
    <div className="flex flex-col gap-3 bg-white border border-ink-200 shadow-sm rounded-2xl p-4 h-fit">
      <h1 className="font-bold text-xl text-ink-800">Select Payment Method</h1>

      <div className="flex flex-col gap-3">
        {methodtoSelect.map((ele) => {
          const selected = method === ele.Name;
          return (
            <label
              key={ele.id}
              htmlFor={ele.id}
              className={`flex items-center gap-3 rounded-xl border-2 p-3 cursor-pointer transition ${
                selected
                  ? "border-brand-600 bg-brand-50"
                  : "border-ink-200 bg-white hover:border-brand-300"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                name="select-method"
                id={ele.id}
                checked={selected}
                onChange={() => setmethod(ele.Name)}
              />
              <img
                src={ele.icon}
                alt={ele.Name}
                className="w-14 h-10 object-contain shrink-0"
              />
              <div className="flex-1">
                <h2 className="font-bold text-ink-800">{ele.Name}</h2>
                <p className="text-sm text-ink-500">{ele.dec}</p>
              </div>
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected ? "border-brand-600" : "border-ink-300"
                }`}
              >
                {selected && (
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-600"></span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SelectPaymentCard;
