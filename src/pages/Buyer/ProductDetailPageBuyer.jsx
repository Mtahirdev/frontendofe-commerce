import React from "react";
import Upper_Navbar from "../../components/Buyer/Navbar components/Upper_Navbar.jsx";
import Navbar from "../../components/Buyer/Navbar components/Navbar.jsx";
import SecondFooter from "../../components/Buyer/SecondFooter.jsx";
import Footer from "../../components/Buyer/Footer.jsx";
import SideBar from "../../components/Buyer/Navbar components/SideBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddtoCartFetch, BuyerCartFetchItem } from "../../server/server";
import { SetCartArray } from "../../store/feature/ProductsData";
import { IoIosArrowBack } from "react-icons/io";

// placeholder reviews until you load real ones from the backend
const reviews = [
  {
    name: "Ahmed Khan",
    date: "Oct 02, 2026",
    rating: 5,
    comment:
      "Excellent product! The quality is great, and it works exactly as described. Definitely worth the price.",
  },
  {
    name: "Muhammad Ali",
    date: "Sep 28, 2026",
    rating: 4,
    comment:
      "Really good quality for the price. The packaging was nice, and delivery was smooth. Highly recommended.",
  },
  {
    name: "Hassan Ahmed",
    date: "Sep 20, 2026",
    rating: 5,
    comment:
      "Very satisfied with my purchase. The product looks great and meets my expectations.",
  },
  {
    name: "Usman Tariq",
    date: "Sep 15, 2026",
    rating: 4,
    comment:
      "Good product overall. Quality is impressive, and I would consider buying it again.",
  },
];

const ProductDetailPageBuyer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userstore);
  const { productarr } = useSelector((state) => state.productstore);

  const product = productarr?.find((ele) => ele._id == id);

  const AddtoCart = async () => {
    try {
      const res = await AddtoCartFetch(product._id, token);
      if (res.msg_login) {
        toast.error("please login");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_signup) {
        toast.error("please signup");
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msg_itemexist) {
        toast.error("item is already exist");
      } else if (res.msg_added) {
        toast.success("item add to cart successfully");
        const cart = await BuyerCartFetchItem(token);
        if (cart.msg_succes) dispatch(SetCartArray(cart.item));
        setTimeout(() => navigate("/buyer/cart"), 3000);
      } else {
        toast.error("try again later");
      }
    } catch (error) {
      console.log(error);
      toast.error("try again later");
    }
  };

  const Shell = ({ children }) => (
    <div className="overflow-x-hidden bg-ink-50 min-h-screen text-ink-800">
      <ToastContainer position="top-right" autoClose={3000} />
      <Upper_Navbar />
      <Navbar />
      <SideBar />
      <div className="pt-20 pb-20 md:pt-24 md:pb-5">{children}</div>
    </div>
  );

  const goBack = () => {
    // if the page was opened directly (no history), go to the shop instead
    if (window.history.length > 1) navigate(-1);
    else navigate("/buyer");
  };

  // product list is empty (e.g. page refresh) or id not found
  if (!product) {
    return (
      <Shell>
        <div className="w-[90%] mx-auto text-center py-20">
          <h1 className="text-2xl font-bold text-ink-800">Product not found</h1>
          <p className="text-ink-500 mt-2">
            It may have been removed or is still loading.
          </p>
          <Link
            to="/buyer"
            className="inline-block mt-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 transition-colors"
          >
            Back to shop
          </Link>
        </div>
        <Footer />
      </Shell>
    );
  }

  const lessprice = Math.round(
    product.price - product.price * (product.discount / 100),
  );

  const details = [
    { label: "Category", value: product.category },
    { label: "Color", value: product.color },
    { label: "Size", value: product.size },
    { label: "Unit", value: product.unit },
    { label: "Stock", value: product.stock },
    { label: "Reviews", value: product.reviews },
  ];

  const inStock = Number(product.stock) > 0;

  return (
    <>
      <Shell>
        <div className="w-[95%] mx-auto mb-3">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1 rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            <IoIosArrowBack className="text-lg" />
            Back
          </button>
        </div>
        <div className="w-[95%] mx-auto overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-2 md:p-6 lg:grid-cols-3">
            {/* image */}
            <div className="w-full">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-ink-100 p-4">
                <img
                  src={product.mainimg}
                  alt={product.productName}
                  className="h-full w-full object-contain"
                />
                {product.discount > 0 && (
                  <span className="absolute left-3 top-3 rounded-md bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* info */}
            <div className="flex flex-col lg:col-span-2">
              <div className="border-b border-ink-200 pb-4">
                {product.brand && (
                  <p className="text-sm font-medium text-brand-600">
                    {product.brand}
                  </p>
                )}
                <h2 className="mt-1 text-xl font-bold text-ink-800 sm:text-2xl lg:text-3xl">
                  {product.productName}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-warning-500">★</span>
                  <span className="font-semibold text-ink-800">
                    {product.rating}
                  </span>
                  <span className="text-sm text-ink-500">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-3">
                {details.map((d) => (
                  <div key={d.label}>
                    <p className="text-xs font-medium text-ink-500">
                      {d.label}
                    </p>
                    <p className="mt-1 font-semibold text-ink-800">{d.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 border-b border-ink-200 pb-5">
                <span className="text-3xl font-bold text-accent-600">
                  Rs {lessprice}
                </span>
                <span className="text-base text-ink-400 line-through">
                  Rs {product.price}
                </span>
                <span className="rounded-md bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-600">
                  {product.discount}% OFF
                </span>
                <span
                  className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${
                    inStock
                      ? "bg-success-50 text-success-600"
                      : "bg-danger-50 text-danger-600"
                  }`}
                >
                  {inStock ? "In stock" : "Out of stock"}
                </span>
              </div>

              <div className="py-5">
                <h3 className="text-base font-bold text-ink-800">
                  Description
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-500 sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={AddtoCart}
                  disabled={!inStock}
                  className="flex-1 rounded-xl bg-accent-500 px-5 py-3 font-semibold text-white transition hover:bg-accent-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Add to Cart
                </button>
                <Link
                  to="/buyer/cart"
                  className="flex-1 rounded-xl border-2 border-brand-600 px-5 py-3 text-center font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>

          {/* reviews */}
          <div className="border-t border-ink-200 p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-ink-800 sm:text-xl">
                  Customer Reviews
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  What people say about this product
                </p>
              </div>
              <div className="w-fit rounded-lg bg-warning-50 px-3 py-2">
                <span className="text-warning-500">★</span>
                <span className="ml-1 font-bold text-ink-800">
                  {product.rating}/5
                </span>
                <span className="ml-1 text-xs text-ink-500">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-ink-200 bg-ink-50 p-4 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                        {review.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-bold text-ink-800">
                          {review.name}
                        </h4>
                        <p className="mt-1 text-xs text-ink-500">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-sm text-warning-500">
                      {"★".repeat(review.rating)}
                      <span className="text-ink-300">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-ink-500">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SecondFooter />
        <Footer />
      </Shell>
    </>
  );
};

export default ProductDetailPageBuyer;
