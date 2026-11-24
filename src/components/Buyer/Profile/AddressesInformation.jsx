import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline, MdLocationCity } from "react-icons/md";
import { Delete_Address, Set_Address } from "../../../server/server";
import { setUserData } from "../../../store/feature/UserData";
import { toast } from "react-toastify";

const AddressesInformation = ({ toggleFun }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.userstore);
  const addresses = user.userdata.address || [];
  const [deletingId, setdeletingId] = useState(null);

  const SubmitFun = async (id) => {
    try {
      const res = await Set_Address({ id }, token);
      if (res.msg) {
        dispatch(setUserData(res.user));
        toast.success("address is active");
      } else if (res.msg_range) {
        toast.error("Out of Range");
      } else {
        toast.error("try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("try again");
    }
  };

  const DeleteFun = async (ele) => {
    if (!window.confirm(`Delete address "${ele.addressName}"?`)) return;

    setdeletingId(ele._id);
    try {
      const res = await Delete_Address({ id: ele._id }, token);
      if (res.msg) {
        dispatch(setUserData(res.user));
        toast.success("address deleted");
      } else {
        toast.error("try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("try again");
    } finally {
      setdeletingId(null);
    }
  };

  return (
    <div className="w-[95%] lg:w-[90%] mx-auto bg-white border border-ink-200 rounded-2xl shadow-sm p-5 mb-4">
      {addresses.length === 0 ? (
        <p className="text-center text-ink-500 py-4">
          You have not added any address yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {addresses.map((ele) => (
            <div
              key={ele._id}
              className={`flex flex-col overflow-hidden rounded-2xl border-2 transition ${
                ele.active
                  ? "border-brand-600 bg-brand-50"
                  : "border-ink-200 bg-white hover:border-brand-300"
              }`}
            >
              {/* select area */}
              <button
                type="button"
                onClick={() => SubmitFun(ele._id)}
                className="flex flex-1 gap-3 p-4 text-left"
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

                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="block truncate text-lg font-bold text-ink-800">
                      {ele.addressName}
                    </span>
                    {ele.active && (
                      <span className="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
                        Active
                      </span>
                    )}
                  </span>

                  {/* city */}
                  <span className="mt-1 flex items-center gap-1 text-sm font-medium text-brand-600">
                    <MdLocationCity className="shrink-0 text-base" />
                    {ele.city || "City not added"}
                  </span>

                  <span className="mt-2 block text-sm font-medium text-ink-700">
                    {ele.phoneNumber}
                  </span>
                  <span className="mt-1 block break-words text-sm text-ink-500">
                    {ele.address}
                  </span>
                </span>
              </button>

              {/* delete */}
              <div className="flex justify-end border-t border-ink-200 px-4 py-2">
                <button
                  type="button"
                  onClick={() => DeleteFun(ele)}
                  disabled={deletingId === ele._id}
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-danger-600 transition-colors hover:bg-danger-50 disabled:opacity-50"
                >
                  <MdDeleteOutline className="text-lg" />
                  {deletingId === ele._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => toggleFun("add address")}
          className="rounded-xl border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white font-semibold px-6 py-2 transition-colors"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default AddressesInformation;
