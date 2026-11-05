import React, { useState } from "react";
import PaymentHeading from "./PaymentHeading.jsx";
import SelectPaymentCard from "./SelectPaymentCard.jsx";
import CardDetail from "./CardDetail.jsx";
import OrderSummary from "./OrderSummary.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlaceOrder } from "../../../server/server.js";
import { toast } from "react-toastify";
import { setOrderData, setUserData } from "../../../store/feature/UserData.js";

const PaymentMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [method, setmethod] = useState("Credit/Debt Card");
  const [data, setdata] = useState({});
  const { user, token } = useSelector((s) => s.userstore);
  const { cartarr } = useSelector((s) => s.productstore);

  // calculation
  const discount = 0;
  const subtotal = Math.round(
    cartarr.reduce((sum, ele) => {
      const discounted = ele.price - ele.price * (ele.discount / 100);
      return sum + discounted * ele.qyt;
    }, 0),
  );
  const shipping = subtotal > 4000 ? 0 : 200;
  const total = subtotal + shipping;

  const address = user.userdata.address.find((ele) => ele.active == true);

  const collectData = async (e) => {
    const formdata = Object.fromEntries(new FormData(e.target));
    setdata(formdata);
  };

  const pushData = async () => {
    if (!address) {
      toast.error("please add and select a delivery address in your profile");
      return;
    }

    const order = {
      data,
      shipping,
      total,
      method,
      state: "pending",
      items: cartarr,
      address,
      discount,
    };

    setloading(true);
    try {
      const res = await PlaceOrder(order, token);

      if (res.msg_login) {
        setloading(false);
        toast.error("please login");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error("please signup");
        setTimeout(() => navigate("/auth/signup"), 3000);
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
        setTimeout(() => navigate("/buyer"), 3000);
      } else {
        setloading(false);
        toast.error("please try again later");
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("please try again later");
    }
  };

  if (cartarr.length === 0) {
    return (
      <div className="w-[90%] mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-ink-800">Your cart is empty</h1>
        <p className="text-ink-500 mt-2">
          Add some products before checking out.
        </p>
        <Link
          to="/buyer"
          className="inline-block mt-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}

      <PaymentHeading />
      <div className="w-[95%] mx-auto grid grid-cols-1 gap-4 items-start md:grid-cols-2 lg:grid-cols-3 mb-6">
        <SelectPaymentCard method={method} setmethod={setmethod} />
        <CardDetail method={method} collectData={collectData} />
        <OrderSummary
          count={cartarr.length}
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
          total={total}
          loading={loading}
          pushData={pushData}
        />
      </div>
    </>
  );
};

export default PaymentMain;
