import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../../store/slices/authSlice";
import { convertToPersian } from "../../utils";
import { LeftArrowIcon, Logo } from "../../assets/icons";
import "./otp.scss";

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
    <div className="otp-page">
      <form className="otp-form" onSubmit={handleSubmit}>
        <div className="logo-wrapper">
          <div className="nothing"></div>
          <Logo />
          <button className="back-button" onClick={handleEditPhone}>
            <LeftArrowIcon />
          </button>
        </div>
        <p className="title">کد تایید را وارد کنید</p>
        <p className="description">
          کد تایید برای شماره {convertToPersian(phone)} پیامک شد
        </p>
        <button className="change-phone" onClick={handleEditPhone}>
          تغییر شماره همراه
        </button>
        <div className="otp-inputs-wrapper">
          {otp.map((digit, index) => (
            <input
              className="otp-input"
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              ref={(el) => (inputRefs.current[index] = el)}
              required
            />
          ))}
        </div>
        <span className="resend-code-wrapper">
          <p className="resend-code-title">کد را دریافت نکردید؟</p>
          <button
            className="resend-code-button"
            onClick={handleResendCode}
            disabled={timer > 0}
          >
            ارسال مجدد
          </button>
        </span>
        <button
          className={`submit-button ${
            otp.join("").length === 4 && otp.join("") !== "1111"
              ? "invalid"
              : ""
          }`}
          type="submit"
        >
          {otp.join("").length < 4 ? (
            <p className="resend-code-counter">
              {`${convertToPersian(timer)} ثانیه تا ارسال مجدد`}
            </p>
          ) : (
            "تایید"
          )}
        </button>
        {otp.join("").length === 4 && otp.join("") !== "1111" ? (
          <p className="invalid-code">کد وارد شده صحیح نمی باشد</p>
        ) : null}
      </form>
    </div>
  );
};

export default OtpPage;
