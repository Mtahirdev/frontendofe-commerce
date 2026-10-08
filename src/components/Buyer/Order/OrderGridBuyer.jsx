import React from "react";
import OrderBox from "./OrderBox.jsx";
import { useSelector } from "react-redux";

const OrderGrid = () => {
  let { order } = useSelector((s) => s.userstore);
  console.log(order);

  return (
    <>
      <div className="flex justify-center items-center w-full h-full pb-5 ">
        <div className="grid w-[90%] h-full pb-5 grid-cols-1 md:grid-cols-2 gap-4">
          {order.map((ele, index) => {
            return <OrderBox ele={ele} key={ele._id}></OrderBox>;
          })}
        </div>
      </div>
    </>
  );
};

export default OrderGrid;
