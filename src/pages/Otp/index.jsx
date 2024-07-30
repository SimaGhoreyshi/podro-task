import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../../store/slices/authSlice";
import { convertToPersian } from "../../utils";

const OtpPage = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.phone);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!phone) {
      navigate("/");
    }
  }, [phone]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("") === "1111") {
      dispatch(login());
      navigate("/home");
    } else {
      toast.error("کد وارد شده نادرست است");
    }
  };

  const handleEditPhone = () => {
    navigate("/");
  };

  const handleResendCode = () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    toast.success("کد ورود ارسال شد");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {/* logo */}
          <button onClick={handleEditPhone}>back</button>
        </div>
        <p>کد تایید را وارد کنید</p>
        <p>کد تایید برای شماره {convertToPersian(phone)} پیامک شد</p>
        <button onClick={handleEditPhone}>تغییر شماره همراه</button>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            ref={(el) => (inputRefs.current[index] = el)}
            required
          />
        ))}
        <span>
          <p>کد را دریافت نکردید؟</p>
          <p>
            {timer > 0 ? (
              `${convertToPersian(timer)} ثانیه تا ارسال مجدد`
            ) : (
              <button onClick={handleResendCode} disabled={timer > 0}>
                ارسال مجدد
              </button>
            )}
          </p>
        </span>
        <button type="submit">تایید</button>
      </form>
    </div>
  );
};

export default OtpPage;
