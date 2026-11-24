import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import Navbar from "../../components/Seller/Navbar/Navbar.jsx";
import SearchBar from "../../components/Seller/Products/SearchBar.jsx";
import ProductGrid from "../../components/Seller/Products/ProductGrid.jsx";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../utils/utils.js";
import {
  pushNotificationData,
  setNotificationData,
  setOrderData,
} from "../../store/feature/UserData.js";

const SellerPage = () => {
  // let { user, verified, type } = useSelector((state) => state.userstore);
  // let dispatch = useDispatch();

  // if (verified && type !== "auth") {
  //   useEffect(() => {
  //     socket.io.opts.query = {
  //       userId: user._id,
  //     };

  //     socket.connect();

  //     socket.on("getOnlineUsers", (data) => {
  //       console.log(data);
  //     });

  //     socket.on("notification", (data) => {
  //       console.log(data);
  //       dispatch(pushNotificationData(data.notification));
  //       dispatch(setOrderData(data.order));
  //       toast.success(data.notification.text);
  //     });

  //     return () => socket.close();
  //   }, []);
  // }
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center bg-ink-100 min-h-screen text-ink-800">

      <div className="w-full lg:w-[30%] desk:w-[22%]">
        <Navbar />
      </div>

      <div className="w-full lg:w-[70%] desk:w-[78%] flex flex-col items-center gap-4 px-4 pt-5 pb-10">
        <div className="w-[90%] flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink-800">
              Products
            </h1>
            <p className="text-ink-500 text-sm">
              Manage the items in your store
            </p>
          </div>
          <Link
            to="/seller/addproduct"
            className="flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2.5 transition-colors"
          >
            <IoIosAddCircleOutline className="text-xl" />
            <span className="hidden sm:inline">Add Product</span>
          </Link>
        </div>

        <SearchBar />
        <ProductGrid />
      </div>
    </div>
  );
};

export default SellerPage;
