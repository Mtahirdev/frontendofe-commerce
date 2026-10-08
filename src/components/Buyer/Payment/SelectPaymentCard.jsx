import React, { useEffect } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { Form } from "react-router-dom";
import credit from "../../../assets/credit-card.png";
import easypaisa from "../../../assets/easypaisa.png";
import jazzcash from "../../../assets/jazzcash.png";
import cashon from "../../../assets/cashondelivery.png";
import { useDispatch, useSelector } from "react-redux";

const SelectPaymentCard = ({ setmethod }) => {
  let dispatch = useDispatch();

  let methodtoSelect = [
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

  let fun = (id, name) => {
    let arr = [];
    let element = document.querySelector(`#${id}`);
    element.classList.add("border-blue-600");
    let elements = document.querySelectorAll(".selector");
    elements = [...elements];
    elements = elements.filter((e, i) => {
      return e.id != id;
    });
    for (let i = 0; i < elements.length; i++) {
      const id = elements[i].id;
      let givenElement = document.querySelector(`#${id}`);
      givenElement.classList.remove("border-blue-600");
    }
    setmethod(name);
  };
  useEffect(() => {
    fun("inputA", "Credit/Debt Card");
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 border-2 border-red-600 shadow-2xl shadow-gray-300 w-[95%] md:w-[90%] pb-3 md:col-span-2 lg:col-span-1 rounded-2xl h-fit md:h-110 lg:h-fit">
        <h1 className="font-bold ml-3 text-[22px] text-center">
          Select Payment Method
        </h1>
        <Form className="w-full flex flex-col justify-center items-center gap-3">
          {methodtoSelect.map((ele, index) => {
            return (
              <label
                htmlFor={ele.id}
                id={ele.id}
                className="selector grid grid-cols-4  w-[90%] border-2 items-center text-center pr-3  "
                key={index}
                onClick={() => {
                  return fun(ele.id, ele.Name);
                }}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="select-method"
                  id={ele.id}
                />
                <div>
                  <img src={ele.icon} className="w-14 h-10 ml-3" />
                </div>
                <div className="mt-4 col-span-3">
                  <h1 className="font-extrabold">{ele.Name}</h1>
                  <p>{ele.dec}</p>
                </div>
              </label>
            );
          })}
        </Form>
      </div>
    </>
  );
};

export default SelectPaymentCard;
