import React, { useState } from "react";
import PaymentHeading from "./PaymentHeading.jsx";
import SelectPaymentCard from "./SelectPaymentCard.jsx";
import CardDetail from "./CardDetail.jsx";
import OrderSummary from "./OrderSummary.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlaceOrder } from "../../../server/server.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { setOrderData, setUserData } from "../../../store/feature/UserData.js";

const PaymentMain = () => {
  // calculation
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [loading, setloading] = useState();
  let { user, token, order } = useSelector((s) => s.userstore);
  let { cartarr } = useSelector((s) => s.productstore);
  console.log(cartarr);

  let arr = cartarr.map((ele) => {
    let a = ele.price * (ele.discount / 100);
    return ele.price - a;
  });

  let value = arr.reduce((prev, cur, index) => {
    return cur + prev;
  });

  let shipping = 200;

  if (value > 4000) {
    shipping = 0;
  }

  let discount = 0;

  let total = value + shipping;
  // end

  let address = user.userdata.address.find((ele) => {
    return ele.active == true;
  });

  let [method, setmethod] = useState("Cash On Delivery");
  let [data, setdata] = useState({});
  let collectData = async (e) => {
    let formdata = Object.fromEntries(new FormData(e.target));
    setdata(formdata);
  };

  let pushData = async (e) => {
    let a = {
      data,
      shipping,
      total,
      method,
      state: "pending",
      items: cartarr,
      address,
      discount,
    };

    console.log(a);

    let res = await PlaceOrder(a, token);
    console.log(res);
    setloading(true);

    try {
      if (res.msg_login) {
        setloading(false);
        toast.error("please login");
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error("please signup");
        setTimeout(() => {
          navigate("/auth/signup");
        }, 3000);
      } else if (res.msg_validation) {
        setloading(false);
        toast.error(res.validation.msg);
      } else if (res.msgerr) {
        setloading(false);
        toast.error("please try again later");
      } else if (res.msg) {
        setloading(false);
        toast.success("your order is placed");
        dispatch(setUserData(res.user));
        dispatch(setOrderData(res.order));
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("please try again later");
    }
  };

  return (
    <>
      {loading && (
        <>
          <div className="fixed z-50 w-full h-full inset-0 bg-black/50 flex justify-center items-center text-2xl md:text-3xl lg:text-4xl">
            <div className="grid grid-cols-2 w-10 h-10  animate-bounce">
              <div className="bg-blue-500 w-9 h-9 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="fixed z-50 w-full h-full inset-0 bg-black/50 flex justify-center items-center text-2xl md:text-3xl lg:text-4xl">
            <div className="grid grid-cols-2 w-10 h-10  animate-bounce">
              <div className="bg-green-500 w-9 h-9 rounded-full animate-pulse"></div>
            </div>
          </div>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <PaymentHeading></PaymentHeading>
        <div className="grid grid-cols-1  md:grid-cols-4 md:grid-rows-2 place-items-center justify-items-center gap-3 lg:grid-cols-3 lg:grid-rows-1 w-screen h-full mb-4 ">
          <SelectPaymentCard setmethod={setmethod}></SelectPaymentCard>
          <CardDetail method={method} collectData={collectData}></CardDetail>
          <OrderSummary pushData={pushData}></OrderSummary>
        </div>
      </div>
    </>
  );
};

export default PaymentMain;
