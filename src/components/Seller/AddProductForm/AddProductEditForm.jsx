import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { EditItem, FetchItem } from "../../../server/server.js";
import { toast } from "react-toastify";
import { SetProductArray } from "../../../store/feature/ProductsData.js";
import ProductFields from "./ProductFields.jsx";

const AddProductEditForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userstore);
  const { productarr } = useSelector((state) => state.productstore);
  const [loading, setloading] = useState(false);

  const product = productarr?.find((ele) => ele._id == id);

  const SubmitFun = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formdata = new FormData(e.target);
      const res = await EditItem(formdata, token);

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
        toast.success("item edit successfully");
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

  // e.g. page was refreshed and the product list is not loaded yet
  if (!product) {
    return (
      <div className="w-[90%] rounded-2xl border border-ink-200 bg-white py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-ink-800">Product not found</p>
        <p className="mt-1 text-ink-500">
          Open it again from your products list.
        </p>
        <Link
          to="/seller"
          className="mt-5 inline-block rounded-xl bg-brand-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Back to products
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

      <div className="w-full flex justify-center">
        <Form
          onSubmit={SubmitFun}
          className="w-[90%] mb-10 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <ProductFields product={product} />

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
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProductEditForm;
