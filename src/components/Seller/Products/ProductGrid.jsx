import React, { useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import { useDispatch, useSelector } from "react-redux";
import { FetchItem } from "../../../server/server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SetProductArray } from "../../../store/feature/ProductsData";

const ProductGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [err, seterr] = useState(false);
  const { token } = useSelector((state) => state.userstore);
  const { productarr } = useSelector((state) => state.productstore);

  useEffect(() => {
    FetchItem(token).then((res) => {
      try {
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
          seterr(true);
          toast.error("please try again later");
        } else {
          setloading(false);
          seterr(false);
          dispatch(SetProductArray(res.products));
        }
      } catch (error) {
        console.log(error);
        setloading(false);
        seterr(true);
        toast.error("please try again later");
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="w-[90%] grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-80 rounded-2xl bg-white border border-ink-200 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (err) {
    return (
      <div className="w-[90%] rounded-2xl bg-danger-50 text-danger-600 text-center py-8 font-semibold">
        Failed to fetch items
      </div>
    );
  }

  if (!productarr || productarr.length === 0) {
    return (
      <div className="w-[90%] rounded-2xl bg-white border border-ink-200 text-center py-12">
        <p className="text-lg font-semibold text-ink-800">No products yet</p>
        <p className="text-ink-500 mt-1">
          Add your first product to start selling.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[90%] grid grid-cols-1 gap-4 md:grid-cols-2 lg:w-[80%] desk:grid-cols-3">
      {productarr.map((ele) => (
        <ProductBox key={ele._id} product={ele} />
      ))}
    </div>
  );
};

export default ProductGrid;
