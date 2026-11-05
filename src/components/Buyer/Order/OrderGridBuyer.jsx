import React from "react";
import OrderBox from "./OrderBox.jsx";
import { useSelector } from "react-redux";

const OrderGrid = () => {
  const { order } = useSelector((s) => s.userstore);

  if (!order || order.length === 0) {
    return (
      <p className="text-center text-ink-500 py-10">You have no orders yet.</p>
    );
  }

  return (
    <div className="flex justify-center items-center w-full pb-5">
      <div className="grid w-[90%] pb-5 grid-cols-1 md:grid-cols-2 gap-4">
        {order.map((ele) => (
          <OrderBox ele={ele} key={ele._id} />
        ))}
      </div>
    </div>
  );
};

export default OrderGrid;
