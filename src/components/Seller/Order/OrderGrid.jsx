import React from "react";
import OrderBox from "./OrderBox.jsx";

const OrderGrid = () => {
  return (
    <>
      <div className="grid w-full h-full pb-5 grid-cols-1 md:grid-cols-2 gap-4">
        <OrderBox></OrderBox>
        <OrderBox></OrderBox>
        <OrderBox></OrderBox>
        <OrderBox></OrderBox>
        <OrderBox></OrderBox>
        <OrderBox></OrderBox>
        <OrderBox></OrderBox>
      </div>
    </>
  );
};

export default OrderGrid;
