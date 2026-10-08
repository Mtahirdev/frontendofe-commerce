import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { Set_Address } from "../../../server/server";
import { setUserData } from "../../../store/feature/UserData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddressesInformation = ({ toggleFun }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  let { user, token } = useSelector((state) => state.userstore);

  let SubmitFun = async (id) => {
    setloading(true);
    console.log(id);

    let data = { id };

    let res = await Set_Address(data, token);
    console.log(res);
    if (res.msg) {
      dispatch(setUserData(res.user));
      toast.success("address is active");
    } else {
      toast.error("try again");
    }
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-[90%] mt-3 shadow-2xl shadow-gray-400 mb-6 pt-3 pb-3 ml-3">
        <Form className="flex flex-col justify-center items-center gap-3 lg:grid lg:grid-cols-3 lg:grid-rows-1 ">
          {user.userdata.address.map((ele, index) => {
            let active = ele.active;

            return (
              <>
                <button
                  key={ele._id}
                  onClick={() => SubmitFun(ele._id)}
                  type="button"
                  className="border-2 h-fit pb-3 w-[90%] rounded-2xl"
                >
                  <label
                    htmlFor={ele.addressName}
                    // className=" border-2 h-fit pb-3 w-[90%] rounded-2xl  "
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={ele.active}
                      className="ml-4 mt-3 w-6 h-6 "
                    />
                    <h1 className="text-2xl ml-5 font-bold">
                      {ele.addressName}
                    </h1>
                    <h2 className="text-[18px] ml-5 font-bold">
                      {ele.phoneNumber}
                    </h2>
                    <p className="ml-5 font-bold">{ele.address}</p>
                  </label>
                </button>
              </>
            );
          })}
        </Form>
        <div className="w-full h-fit flex justify-center mt-3">
          <button
            onClick={() => {
              toggleFun("add address");
            }}
            className="border-2 border-gray-300 rounded-[10px] pl-2 pr-2 pt-1 pb-1"
          >
            Add Address
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressesInformation;
