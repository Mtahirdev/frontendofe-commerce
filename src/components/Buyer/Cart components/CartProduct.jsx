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
    <>
      <div class="flex w-full max-w-3xl flex-col gap-4 rounded-2xl bg-white p-4 shadow-2xl  sm:flex-row">
        <ToastContainer position="top-right" autoClose={3000} />
        <Link to={`productdetail/${product._id}`}>
          <div class="h-54 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-36">
            <img
              src={product.mainimg}
              alt="Nike Air Max"
              class="h-full w-full object-cover"
            />
          </div>
        </Link>

        <div class="flex flex-1  flex-col justify-between">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold text-gray-800">
                {product.productName}
              </h2>

              <p class="mt-1 text-sm text-gray-500">
                {product.color} · Size {product.size}
              </p>
            </div>

            <button
              onClick={() => Deletcart(product._id)}
              class="text-sm font-medium mt-1 sm:mt-0 ml-2 sm:ml-0 text-red-500 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>

          <div class="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span class="text-xl font-bold text-gray-900">${lessprice}</span>

              <span class="ml-2 text-sm text-gray-400 line-through">
                ${product.price}
              </span>
            </div>

            <div class="flex items-center overflow-hidden rounded-lg border border-gray-300">
              <button
                onClick={() => decreaseQyt(product._id)}
                class="flex h-9 w-9 items-center justify-center text-xl font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                −
              </button>

              <span class="flex h-9 min-w-10 items-center justify-center border-x border-gray-300 px-3 font-semibold text-gray-800">
                {qyt}
              </span>

              <button
                onClick={() => increaseQyt(product._id)}
                class="flex h-9 w-9 items-center justify-center text-xl font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div class="text-right">
              <p class="text-xs text-gray-500">Total</p>

              <p class="text-lg font-bold text-gray-900">${lessprice}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
