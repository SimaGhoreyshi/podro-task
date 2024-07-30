import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setPhone } from "../../store/slices/phoneSlice";

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>{/* logo */}</div>
        <p>به پنل مدیریت تسک پادرو خوش آمدید</p>
        <p>برای ورود، لطفا شماره موبایل خود را وارد کنید</p>
        <input
          type="tel"
          placeholder="شماره موبایل"
          value={phone}
          onChange={(e) => setPhoneInput(e.target.value)}
          required
        />
        <button type="submit">ارسال کد‌ تایید</button>

        <span>
          <p>حساب کاربری ندارید؟</p>
          <a>ثبت‌نام</a>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
