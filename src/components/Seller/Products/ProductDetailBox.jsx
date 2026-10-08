import React from "react";
import Logo from "../../../assets/logo.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailBox = () => {
  let { id } = useParams();

  let { productarr } = useSelector((state) => state.productstore);

  let product = productarr.filter((ele) => {
    return ele._id == id;
  });

  product = product[0];

  let lessprice = product.price * (product.discount / 100);
  lessprice = product.price - lessprice;
  console.log(lessprice);
  console.log(product);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm lg:mr-10 lg:pb-10">
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 md:grid-cols-[280px_1fr] md:p-6 lg:grid-cols-[320px_1fr]">
        <div className="w-full">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F8FAFC] p-4">
            <img
              src={product.mainimg}
              alt="Wireless Headphones"
              className="h-full w-full object-contain"
            />
            {/* <span className="absolute left-3 top-3 rounded-md bg-[#F72555] px-2.5 py-1 text-xs font-semibold text-white">
              25% OFF
            </span> */}
          </div>

          {/* <div className="mt-3 grid grid-cols-4 gap-2">
            <div className="aspect-square overflow-hidden rounded-lg border-2 border-[#FF5A36] bg-[#F8FAFC] p-1">
              <img src={Logo} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-1">
              <img src={Logo} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-1">
              <img src={Logo} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-1">
              <img src={Logo} alt="" className="h-full w-full object-contain" />
            </div>
          </div> */}
        </div>

        <div className="flex flex-col">
          <div className="border-b border-[#E2E8F0] pb-4">
            <p className="text-sm font-medium text-[#64748B]">Sony</p>

            <h2 className="mt-1 text-xl font-bold text-[#0B1730] sm:text-2xl lg:text-3xl">
              {product.productName}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-amber-400">★</span>
              <span className="font-semibold text-[#0B1730]">4.8</span>
              <span className="text-sm text-[#64748B]">(120 reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4 py-5 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-[#64748B]">Category</p>
              <p className="mt-1 font-semibold text-[#0B1730]">
                {product.category}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#64748B]">Color</p>
              <p className="mt-1 font-semibold text-[#0B1730]">
                {product.color}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#64748B]">Size</p>
              <p className="mt-1 font-semibold text-[#0B1730]">
                {product.size}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#64748B]">Unit</p>
              <p className="mt-1 font-semibold text-[#0B1730]">
                {product.unit}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#64748B]">Stock</p>
              <p className="mt-1 font-semibold text-[#0B1730]">
                {product.stock}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#64748B]">Reviews</p>
              <p className="mt-1 font-semibold text-[#0B1730]">
                {product.reviews}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-b border-[#E2E8F0] pb-5">
            <span className="text-2xl font-bold text-[#FF5A36]">
              {lessprice}
            </span>

            <span className="text-base text-[#94A3B8] line-through">
              {product.price}
            </span>

            <span className="rounded-md bg-[#FFF1ED] px-2 py-1 text-xs font-semibold text-[#F72555]">
              {product.discount}% OFF
            </span>
          </div>

          <div className="py-5">
            <h3 className="text-base font-bold text-[#0B1730]">Description</h3>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#64748B] sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded-lg bg-[#0B1730] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162442]"
            >
              Edit Product
            </button>

            <button
              type="button"
              className="flex-1 rounded-lg bg-[#F72555] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D91D48]"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailBox;
