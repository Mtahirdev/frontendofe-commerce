import React from "react";
import CreditCard from "./CardDetailBox/CreditCard";
import JazzCash from "./CardDetailBox/JazzCash";
import EasyPaisa from "./CardDetailBox/EasyPaisa";
import CashOnDelivery from "./CardDetailBox/CashOnDelivery";
import { useSelector } from "react-redux";

const CardDetail = ({ method, collectData }) => {
  return (
    <>
      <div className="w-[95%] md:w-[90%] rounded-2xl h-fit md:h-110 lg:h-fit pb-3 border-2 border-blue-700 md:col-span-2 lg:col-span-1 shadow-2xl shadow-gray-300">
        {method == "Cash On Delivery" ? <CashOnDelivery></CashOnDelivery> : ""}
        {method == "Jazz Cash" ? (
          <JazzCash collectData={collectData}></JazzCash>
        ) : (
          ""
        )}
        {method == "Easypaisa" ? (
          <EasyPaisa collectData={collectData}></EasyPaisa>
        ) : (
          ""
        )}
        {method == "Credit/Debt Card" ? (
          <CreditCard collectData={collectData}></CreditCard>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CardDetail;
