import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteItemServer, FetchItem } from "../../../server/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SetProductArray } from "../../../store/feature/ProductsData";

const ProductBox = ({ product }) => {
  let navigate = useNavigate();
  let lessprice = product.price * (product.discount / 100);
  lessprice = product.price - lessprice;
  console.log(lessprice);
  let { token } = useSelector((state) => state.userstore);
  let dispatch = useDispatch();
  let [loading, setloading] = useState(false);

  let DeleteItem = async (id) => {
    let res = await DeleteItemServer(id, token);

    console.log(res);

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
      } else if (res.msgerr) {
        setloading(false);

        toast.error("please try again later");
      } else if (res.msg_validation) {
        setloading(false);
        toast.error(res.validation.msg);
      } else {
        setloading(false);
        toast.success("item delete successfully");
        FetchItem(token).then((res) => {
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
            } else if (res.msgerr) {
              setloading(false);
            } else {
              setloading(false);
              dispatch(SetProductArray(res.products));
            }
          } catch (error) {
            console.log(error);
            setloading(false);
          }
        });
        setTimeout(() => {
          navigate("/seller");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("please try again later");
    }
  };

  return (
    <>
      <Link
        to={`productdetail/${product._id}`}
        className="block overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
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
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#F8FAFC] p-3">
          <img
            src={product.mainimg}
            alt=""
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-md bg-[#F72555] px-2 py-1 text-xs font-semibold text-white">
            -{product.discount}%
          </span>
        </div>

        <div className="space-y-2 p-3 sm:p-4">
          <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-[#0B1730] sm:text-base">
            {product.productName}
          </h3>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-amber-400">★</span>
            <span className="font-medium text-[#0B1730]">{product.rating}</span>
            <span className="text-xs text-[#64748B]">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold text-[#FF5A36]">
              {lessprice}
            </span>

            <span className="text-sm text-[#94A3B8] line-through">
              {product.price}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                navigate(`editproduct/${product._id}`);
                e.preventDefault();
                e.stopPropagation();
                console.log("Edit");
              }}
              className="flex flex-1 items-center justify-center rounded-lg bg-[#0B1730] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162442]"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                DeleteItem(product._id);
              }}
              className="flex flex-1 items-center justify-center rounded-lg bg-[#F72555] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#D91D48]"
            >
              Delete
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductBox;
