import React, { useEffect, useRef, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { OtpFetch, RequestOtpFetch } from "../../server/server.js";

const Otpcomponent = () => {
  let length = 4;
  const [otp, setotp] = useState(new Array(length).fill(""));
  const [otpa, setotpa] = useState("");
  let [loading, setloading] = useState(false);
  let navigate = useNavigate();
  const ref = useRef([]);

  let handle_change = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    let newotp = [...otp];
    newotp[index] = value;

    let otpc = `${newotp[0]}${newotp[1]}${newotp[2]}${newotp[3]}`;
    setotpa(otpc);

    setotp(newotp);

    if (value && index < length - 1) {
      ref.current[index + 1].focus();
    }
  };

  const handle_keydown = (e, index) => {
    // !otp[index] means if the current input is empty, then move back on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      ref.current[index - 1].focus();
    }
  };

  let [countdown, setcountdown] = useState(2);

  const handle_resend = async () => {
    if (countdown === 0) {
      setcountdown(60);
      let timer = setInterval(() => {
        setcountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      try {
        setloading(true);
        let res = await RequestOtpFetch();

        if (res.msg_login) {
          setloading(false);
          toast.error(res.msg_login);
          setTimeout(() => {
            navigate("/auth/login");
          }, 4000);
        } else if (res.msg_already) {
          setloading(false);
          toast.error(res.msg_already);
          setTimeout(() => {
            navigate("/auth/type");
          }, 4000);
        } else if (res.msg_success) {
          setloading(false);
          toast.success(res.msg_success);
        } else {
          setloading(false);
          toast.error("please try again later");
        }
      } catch (error) {
        console.log(error);

        setloading(false);
        toast.error("please try again later");
      }
    } else {
      toast.error(`please wait ${countdown}sec is left`);
      return;
    }
  };
  useEffect(() => {
    let timer = setInterval(() => {
      setcountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Submit fun
  let OtpSubmit = async () => {
    try {
      setloading(true);
      let data = { otp: otpa };
      let res = await OtpFetch(data);

      if (res.msg_login) {
        setloading(false);
        toast.error(res.msg_login);
        setTimeout(() => {
          navigate("/auth/login");
        }, 4000);
      } else if (res.msg_otperr) {
        setloading(false);
        toast.error(res.msg_otperr);
      } else if (res.msg_signup) {
        setloading(false);
        toast.error(res.msg_signup);
        setTimeout(() => {
          navigate("/auth/signup");
        }, 4000);
      } else if (res.msg_already) {
        setloading(false);
        toast.error(res.msg_already);
        setTimeout(() => {
          navigate("/auth/type");
        }, 4000);
      } else if (res.msg_otpincorrect) {
        setloading(false);
        toast.error(res.msg_otpincorrect);
      } else if (res.msg_otpexpired) {
        setloading(false);
        toast.error(res.msg_otpexpired);
      } else if (res.msg_success) {
        setloading(false);
        toast.success(res.msg_success);
        setTimeout(() => {
          navigate("/auth/type");
        }, 4000);
      } else {
        setloading(false);
        toast.error("please try again later");
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

      <div className="w-screen h-screen flex justify-center items-center text-center">
        <div className="rounded-2xl  shadow-2xl shadow-gray-200 w-[85%] sm:w-96 h-64 text-center mb-10">
          <h1 className="text-2xl mt-3">Enter OTP</h1>

          <Form
            className="flex justify-center flex-col items-center"
            onSubmit={OtpSubmit}
          >
            <div>
              {otp.map((ele, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    ref={(el) => {
                      ref.current[index] = el;
                    }}
                    maxLength="1"
                    value={ele}
                    onChange={(e) => handle_change(e.target.value, index)}
                    onKeyDown={(e) => handle_keydown(e, index)}
                    className="w-12 h-12 text-center border-2 m-2 mt-5 rounded-lg text-xl focus:outline-none focus:border-blue-500"
                  ></input>
                );
              })}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-5"
            >
              Submit
            </button>
          </Form>
          <div className="capitalize mt-6 flex text-center gap-2 justify-center items-center">
            <button className="text-blue-500 underline" onClick={handle_resend}>
              Resend OTP
            </button>
            <p>
              {countdown === 0 ? (
                ""
              ) : (
                <span id="countdown">
                  in {countdown == 0 ? "" : countdown} seconds
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otpcomponent;
