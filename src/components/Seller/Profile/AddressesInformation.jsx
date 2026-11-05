import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Set_Address } from "../../../server/server";
import { setUserData } from "../../../store/feature/UserData";
import { toast } from "react-toastify";

const AddressesInformation = ({ toggleFun }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.userstore);
  const addresses = user.userdata.address || [];

  const SubmitFun = async (id) => {
    try {
      const res = await Set_Address({ id }, token);
      if (res.msg) {
        dispatch(setUserData(res.user));
        toast.success("address is active");
      } else {
        toast.error("try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("try again");
    }
  };

  return (
    <div className="w-[95%] max-w-3xl mx-auto bg-white border border-ink-200 rounded-2xl shadow-sm p-5 mb-4">
      {addresses.length === 0 ? (
        <p className="text-center text-ink-500 py-4">
          You have not added any warehouse address yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((ele) => (
            <button
              key={ele._id}
              type="button"
              onClick={() => SubmitFun(ele._id)}
              className={`flex gap-3 text-left rounded-2xl border-2 p-4 transition ${
                ele.active
                  ? "border-brand-600 bg-brand-50"
                  : "border-ink-200 bg-white hover:border-brand-300"
              }`}
            >
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  ele.active ? "border-brand-600" : "border-ink-300"
                }`}
              >
                {ele.active && (
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-600"></span>
                )}
              </span>
              <span>
                <span className="block text-lg font-bold text-ink-800">
                  {ele.addressName}
                </span>
                <span className="block text-sm font-medium text-ink-700">
                  {ele.phoneNumber}
                </span>
                <span className="block text-sm text-ink-500 mt-1">
                  {ele.address}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => toggleFun("add address")}
          className="rounded-xl border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white font-semibold px-6 py-2 transition-colors"
        >
          Add Warehouse Address
        </button>
      </div>
    </div>
  );
};

export default AddressesInformation;
