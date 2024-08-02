import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setPhone } from "../../store/slices/phoneSlice";
import { Logo } from "../../assets/icons";
import "./login.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedPhone = useSelector((state) => state.phone);

  const [phone, setPhoneInput] = useState(storedPhone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePhone(phone)) {
      dispatch(setPhone(phone));
      navigate("/otp");
    } else {
      toast.error("شماره همراه وارد شده نادرست است");
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-wrapper">
          <Logo />
        </div>
        <p className="title">به پنل مدیریت تسک پادرو خوش آمدید</p>
        <p className="description">
          برای ورود، لطفا شماره موبایل خود را وارد کنید
        </p>
        <input
          className="phone-input"
          type="tel"
          placeholder="شماره موبایل"
          value={phone}
          onChange={(e) => setPhoneInput(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">
          ارسال کد‌ تایید
        </button>

        <span className="new-user-wrapper">
          <p className="new-user-title">حساب کاربری ندارید؟</p>
          <a className="new-user-anchor">ثبت‌نام</a>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
