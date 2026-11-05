import React, { useEffect, useState } from "react";
import OrderBox from "./OrderBox.jsx";
import { FetchSellerOrder } from "../../../server/server.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setOrderData } from "../../../store/feature/UserData.js";

const OrderGrid = () => {
  const { order, token } = useSelector((s) => s.userstore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    FetchSellerOrder(token)
      .then((res) => {
        if (res.msg_login) {
          toast.error("please login");
          setTimeout(() => navigate("/auth/login"), 3000);
        } else if (res.msg_signup) {
          toast.error("please signup");
          setTimeout(() => navigate("/auth/signup"), 3000);
        } else if (res.order) {
          dispatch(setOrderData(res.order));
        } else {
          toast.error("please try again later");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("please try again later");
      })
      .finally(() => setloading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-64 rounded-2xl border border-ink-200 bg-white animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (!order || order.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-ink-200 bg-white py-12 text-center">
        <p className="text-lg font-semibold text-ink-800">No orders yet</p>
        <p className="mt-1 text-ink-500">New orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 pb-5 md:grid-cols-2">
      {order.map((ele) => (
        <OrderBox ele={ele} key={ele._id} />
      ))}
    </div>
  );
};

export default OrderGrid;
