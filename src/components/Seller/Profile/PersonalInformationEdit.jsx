import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { EditProfile } from "../../../server/server";
import { toast } from "react-toastify";
import { setUserData } from "../../../store/feature/UserData";

const PersonalInformationEdit = ({ toggleFun }) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.userstore);
  const p = user.userdata.profile;

  const fields = [
    { value: user.username || "", heading: "Full Name", name: "username" },
    { value: user.email || "", heading: "Email", name: "email" },
    { value: p.number || "", heading: "Phone Number", name: "number" },
    {
      value: p.dateofbirth || "",
      heading: "Date of Birth",
      name: "dateofbirth",
    },
    { value: p.gender || "", heading: "Gender", name: "gender" },
    { value: p.country || "", heading: "Country", name: "country" },
    { value: p.state || "", heading: "State/Province", name: "state" },
    { value: p.city || "", heading: "City", name: "city" },
  ];

  const SubmitFun = async (e) => {
    e.preventDefault();
    setloading(true);
    const formdata = Object.fromEntries(new FormData(e.target));

    try {
      const res = await EditProfile(formdata, token);

      if (res.msg_login) {
        setloading(false);
        toast.error("please login");
        setTimeout(() => navigate("/auth/login"), 3000);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error("please signup");
        setTimeout(() => navigate("/auth/signup"), 3000);
      } else if (res.msgerr) {
        setloading(false);
        toast.error("please try again later");
      } else if (res.msg_validation) {
        setloading(false);
        toast.error(res.validation.msg);
      } else if (res.msg) {
        setloading(false);
        toast.success("Profile update successfully");
        dispatch(setUserData(res.user));
        toggleFun("information");
      } else {
        setloading(false);
        toast.error("some error occur");
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
        <div className="fixed z-50 inset-0 bg-ink-900/50 flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-brand-500 animate-spin"></div>
        </div>
      )}

      <div className="w-[95%] max-w-3xl mx-auto bg-white border border-ink-200 rounded-2xl shadow-sm p-5 mb-4">
        <h1 className="font-bold text-2xl text-ink-800 mb-4">
          Edit your profile
        </h1>

        <Form onSubmit={SubmitFun}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((ele) => (
              <div key={ele.name} className="flex flex-col gap-1">
                <label
                  htmlFor={ele.name}
                  className="text-sm font-medium text-ink-500"
                >
                  {ele.heading}
                </label>
                <input
                  id={ele.name}
                  type="text"
                  defaultValue={ele.value}
                  name={ele.name}
                  className="w-full px-4 py-2.5 bg-white border border-ink-200 rounded-xl text-ink-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => toggleFun("information")}
              className="rounded-xl border border-ink-200 text-ink-700 hover:bg-ink-50 font-semibold px-6 py-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-6 py-2 transition-colors"
            >
              Save changes
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PersonalInformationEdit;
