import React, { useEffect } from "react";
import OrderBox from "./OrderBox.jsx";
import { FetchSellerOrder } from "../../../server/server.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderGrid = () => {
  let { order, token } = useSelector((s) => s.userstore);
  let navigate = useNavigate();
  useEffect(() => {
    FetchSellerOrder(token).then((res) => {
      console.log(res);

      try {
        if (res.msg_login) {
          setTimeout(() => {
            // navigate("/auth/login");
          }, 500);
        } else if (res.msg_signup) {
          setTimeout(() => {
            navigate("/auth/signup");
          }, 4000);
        } else if (res.order) {
          dispatch(setOrderData(res.order));
          setTimeout(() => {
            navigate(`/${res.user.type}`);
          }, 500);
        } else {
        }
      } catch (error) {
        navigate("");
      }
    });
  }, []);
  return (
    <>
      <div className="grid w-full h-full pb-5 grid-cols-1 md:grid-cols-2 gap-4">
        {order?.map((ele, index) => {
          return <OrderBox ele={ele} />;
        })}
      </div>
    </>
  );
};

export default OrderGrid;
