import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/apiRequest";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageLogin = useSelector((state) => {
    return state.auth.login.msg;
  });

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Too Short!")
      .max(18, "Too Long!")
      .required("Required"),
    password: yup
      .string()
      .min(6, "Too Short!")
      .max(18, "Too Long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (user) => {
      loginUser(user, dispatch, navigate);
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="flex items-center justify-center mt-[4rem]">
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="w-full max-w-[600px] p-10 bg-white rounded-lg shadow"
        aria-label="signup-form"
      >
        <h2 className="mb-10 text-3xl font-bold text-center">ĐĂNG NHẬP</h2>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label
            htmlFor="username"
            className="text-2xl font-medium cursor-pointer"
          >
            Tên đăng nhập
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            id="username"
            type="username"
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Điền tên đăng nhập..."
          />
          {formik.errors.username && formik.touched.username && (
            <p className="error text-[red]">{formik.errors.username}</p>
          )}
        </div>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label
            htmlFor="password"
            className="text-2xl font-medium cursor-pointer"
          >
            Mật khẩu
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            type="password"
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Điền mật khẩu..."
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error text-[red]">{formik.errors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-end mb-5 text-slate-400">
          <p>Bạn chưa có tài khoản?</p>
          <Link to="/auth/register" className="text-blue-500 underline">
            Đăng ký
          </Link>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Đăng Nhập
        </button>
        {messageLogin ? (
          <p className=" text-[1.8rem] text-[red] mt-7">
            Sai mật khẩu hoặc tài khoản
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default Login;
