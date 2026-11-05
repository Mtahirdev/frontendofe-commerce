import React from "react";
import CreditCard from "./CardDetailBox/CreditCard";
import JazzCash from "./CardDetailBox/JazzCash";
import EasyPaisa from "./CardDetailBox/EasyPaisa";
import CashOnDelivery from "./CardDetailBox/CashOnDelivery";

const CardDetail = ({ method, collectData }) => {
  return (
    <div className="bg-white border border-ink-200 shadow-sm rounded-2xl p-4 h-fit">
      {method === "Cash On Delivery" && <CashOnDelivery />}
      {method === "Jazz Cash" && <JazzCash collectData={collectData} />}
      {method === "Easypaisa" && <EasyPaisa collectData={collectData} />}
      {method === "Credit/Debt Card" && (
        <CreditCard collectData={collectData} />
      )}
    </div>
  );
};

export default CardDetail;
