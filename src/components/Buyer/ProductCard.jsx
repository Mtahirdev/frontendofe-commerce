import React from "react";
import { CiStar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { AddtoCartFetch, BuyerCartFetchItem } from "../../server/server";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SetCartArray } from "../../store/feature/ProductsData";
const ProductCard = ({ product }) => {
  let lessprice = product.price * (product.discount / 100);
  lessprice = product.price - lessprice;
  console.log(lessprice);
  let { token } = useSelector((state) => state.userstore);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let AddtoCart = async (id) => {
    console.log(id);
    let res = await AddtoCartFetch(id, token);
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
      } else if (res.msg_itemexist) {
        toast.error("item is already exist");
      } else if (res.msg_added) {
        toast.success("item add to cart successfully");
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
  return (
    <>
      <div className="w-full h-fit">
        <ToastContainer position="top-right" autoClose={3000} />
        <div class="w-full max-w-70 overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <Link to={`productdetail/${product._id}`}>
            <div class="relative h-64 w-full overflow-hidden bg-gray-100">
              <img
                src={product.mainimg}
                alt="Nike Shoes"
                class="h-full w-full object-cover transition duration-500 hover:scale-105"
              />

              <span class="absolute left-3 top-3 rounded-md bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                -{product.discount}%
              </span>

              <span class="absolute right-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 shadow">
                {product.reviews} views
              </span>
            </div>
          </Link>

          <div class="p-4">
            <h2 class="truncate text-lg font-semibold text-gray-800">
              {product.productName}
            </h2>

            <div class="mt-2 flex items-center gap-3 text-sm">
              <span class="font-semibold text-gray-700">
                Rating: {product.rating}/5
              </span>

              <span class="text-gray-500">({product.reviews} reviews)</span>
            </div>

            <div class="mt-3 flex items-center gap-2">
              <span class="text-2xl font-bold text-gray-900">{lessprice}</span>

              <span class="text-sm text-gray-400 line-through">
                {product.price}
              </span>
            </div>

            <button
              onClick={() => AddtoCart(product._id)}
              class="mt-4 w-full rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
