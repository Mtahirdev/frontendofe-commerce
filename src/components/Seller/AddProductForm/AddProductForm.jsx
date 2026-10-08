import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { AddItem, FetchItem } from "../../../server/server.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { SetProductArray } from "../../../store/feature/ProductsData.js";

const AddProductForm = () => {
  let { token } = useSelector((state) => state.userstore);
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  let dispatch = useDispatch();

  // Submit Function
  let SubmitFun = async (e) => {
    setloading(true);
    let formdata = new FormData(e.target);

    let res = await AddItem(formdata, token);

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
        toast.success("item add successfully");
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

      <div className="w-full h-fit flex justify-center items-center">
        <Form
          onSubmit={SubmitFun}
          className="bg-[#FFFFFF] w-[90%] px-3 py-3 rounded-2xl place-items-center h-fit mb-10 pb-10 gap-12 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Item Name */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemname" className="text-2xl text-[#334155]">
              Item Name
            </label>
            <input
              type="text"
              name="itemname"
              id="itemname"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Brand */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itembrand" className="text-2xl text-[#334155]">
              Item Brand
            </label>
            <input
              type="text"
              name="itembrand"
              id="itembrand"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Price */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemprice" className="text-2xl text-[#334155]">
              Item Price
            </label>
            <input
              type="number"
              name="itemprice"
              id="itemprice"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Discount */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemdiscount" className="text-2xl text-[#334155]">
              Item Discount
            </label>
            <input
              type="number"
              name="itemdiscount"
              id="itemdiscount"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Stock */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemstock" className="text-2xl text-[#334155]">
              Item Stock
            </label>
            <input
              type="number"
              name="itemstock"
              id="itemstock"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Color */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemcolor" className="text-2xl text-[#334155]">
              Item Color
            </label>
            <input
              type="text"
              name="itemcolor"
              id="itemcolor"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Size */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemsize" className="text-2xl text-[#334155]">
              Item Size
            </label>
            <input
              type="text"
              name="itemsize"
              id="itemsize"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Unit */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemunit" className="text-2xl text-[#334155]">
              Item Unit
            </label>
            <input
              type="text"
              name="itemunit"
              id="itemunit"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Image */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemimg" className="text-2xl text-[#334155]">
              Item Image
            </label>
            <input
              type="file"
              name="itemimg"
              id="itemimg"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item category */}

          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col">
            <label htmlFor="itemname" className="text-2xl text-[#334155]">
              Item Category
            </label>
            <input
              type="text"
              name="itemcategory"
              id="itemname"
              className="w-[90%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl"
            />
          </div>

          {/* Item Description */}
          <div className="w-full min-h-20 ml-3 gap-2 flex flex-col md:col-span-2">
            <label
              htmlFor="itemdescription"
              className="text-2xl text-[#334155]"
            >
              Item Description
            </label>
            <textarea
              name="itemdescription"
              id="itemdescription"
              rows="5"
              className="w-[95%] bg-[#F8FAFC] border border-[#CBD5E1] py-2 px-3 rounded-2xl resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#FF5A36] text-white px-7 py-2 rounded-2xl mt-3 md:mt-5"
          >
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddProductForm;
