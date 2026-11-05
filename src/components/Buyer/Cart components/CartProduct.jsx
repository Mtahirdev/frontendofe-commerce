import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { BuyerCartFetchItem, DeleteCartItem } from "../../../server/server";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  SetCartArray,
  SetQytDecrement,
  SetQytIncrement,
} from "../../../store/feature/ProductsData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const CartProduct = ({ product }) => {
  let lessprice = product.price * (product.discount / 100);
  lessprice = product.price - lessprice;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { token } = useSelector((state) => state.userstore);
  let Deletcart = async (id) => {
    let res = await DeleteCartItem(id, token);
    try {
      if (res.msg_login) {
        toast.error("please login");
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } else if (res.msg_signup) {
        toast.error("please signup");
        setTimeout(() => {
          navigate("/auth/signup");
        }, 3000);
      } else if (res.msg_success) {
        toast.success("item delete to cart successfully");
        BuyerCartFetchItem(token).then((res) => {
          try {
            if (res.msg_login) {
              toast.error("please login");
              setTimeout(() => {
                navigate("/auth/login");
              }, 3000);
            } else if (res.msg_signup) {
              toast.error("please signup");
              setTimeout(() => {
                navigate("/auth/signup");
              }, 3000);
            } else if (res.msg_succes) {
              dispatch(SetCartArray(res.item));
              // setTimeout(() => {
              //   navigate("/buyer/cart");
              // }, 3000);
            } else {
              toast.error("try again later");
            }
          } catch (error) {
            console.log(error);
          }
        });
        setTimeout(() => {
          navigate("/buyer/cart");
        }, 3000);
      } else {
        toast.error("try again later");
      }
    } catch (error) {
      console.log(error);
      toast.error("try again later");
    }
  };
  let [qyt, setqyt] = useState(product.qyt);

  let increaseQyt = async (id) => {
    setqyt(++qyt);
    dispatch(SetQytIncrement({ id, qyt }));
  };

  let decreaseQyt = async (id) => {
    setqyt(--qyt);
    dispatch(SetQytDecrement({ id, qyt }));
  };
  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 rounded-2xl bg-white border border-ink-200 p-4 shadow-sm hover:shadow-md transition sm:flex-row">
      <Link to={`/buyer/productdetail/${product._id}`}>
        <div className="h-54 w-full shrink-0 overflow-hidden rounded-xl bg-ink-100 sm:h-36 sm:w-36">
          <img
            src={product.mainimg}
            alt={product.productName}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between text-left">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink-800">
              {product.productName}
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              {product.color} · Size {product.size}
            </p>
          </div>

          <button
            onClick={() => Deletcart(product._id)}
            className="text-sm font-medium text-danger-500 hover:text-danger-600 hover:underline transition"
          >
            Remove
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xl font-bold text-accent-600">
              Rs {Math.round(lessprice)}
            </span>
            <span className="ml-2 text-sm text-ink-400 line-through">
              Rs {product.price}
            </span>
          </div>

          <div className="flex items-center overflow-hidden rounded-lg border border-ink-200 bg-ink-50">
            <button
              onClick={() => decreaseQyt(product._id)}
              className="flex h-9 w-9 items-center justify-center text-xl font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand-600"
            >
              −
            </button>
            <span className="flex h-9 min-w-10 items-center justify-center border-x border-ink-200 bg-white px-3 font-semibold text-ink-800">
              {qyt}
            </span>
            <button
              onClick={() => increaseQyt(product._id)}
              className="flex h-9 w-9 items-center justify-center text-xl font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand-600"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-xs text-ink-500">Total</p>
            <p className="text-lg font-bold text-ink-800">
              Rs {Math.round(lessprice * qyt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
