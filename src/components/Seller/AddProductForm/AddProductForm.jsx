import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { AddItem, FetchItem } from "../../../server/server.js";
import { toast } from "react-toastify";
import { SetProductArray } from "../../../store/feature/ProductsData.js";
import ProductFields from "./ProductFields.jsx";

const AddProductForm = () => {
  const { token } = useSelector((state) => state.userstore);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const SubmitFun = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formdata = new FormData(e.target);
      const res = await AddItem(formdata, token);

      if (res.msg_login) {
        setloading(false);
        toast.error("please login");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error("please signup");
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msgerr) {
        setloading(false);
        toast.error("please try again later");
      } else if (res.msg_validation) {
        setloading(false);
        toast.error(res.validation.msg);
      } else {
        toast.success("item add successfully");
        const list = await FetchItem(token);
        if (!list.msg_login && !list.msg_signup && !list.msgerr) {
          dispatch(SetProductArray(list.products));
        }
        setloading(false);
        setTimeout(() => navigate("/seller"), 1500);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("please try again later");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}

      <div className="w-full flex justify-center">
        <Form
          onSubmit={SubmitFun}
          className="w-[90%] mb-10 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <ProductFields />

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/seller")}
              className="rounded-xl border border-ink-200 px-7 py-2.5 font-medium text-ink-700 transition-colors hover:bg-ink-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-brand-600 px-7 py-2.5 font-semibold text-white transition hover:bg-brand-700 active:scale-95 disabled:opacity-60"
            >
              Add Product
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProductForm;
