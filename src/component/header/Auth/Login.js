import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/apiRequest";
import { useFormik } from "formik";
import * as yup from "yup";

import { resetMsg } from "../../../redux/slice/authSlice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messageLogin = useSelector((state) => {
    return state.auth.login.msg;
  });
  const isLoading = useSelector((state) => {
    return state.auth.login?.isFetching;
  });
  useEffect(() => {
    dispatch(resetMsg());
  }, []);
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
    <div className="flex items-center justify-center mt-[4rem] mx-[2rem] rounded-2xl overflow-hidden">
      {/* <a href="http://localhost:5002/auth/google"> google</a> */}

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
          <p className="mr-2">Bạn chưa có tài khoản?</p>
          <Link
            to="/auth/register"
            className="hover:opacity-50 text-blue-500 underline"
          >
            Đăng ký
          </Link>
        </div>
        <Link
          className="relative top-[-1rem] text-blue-500 hover:opacity-50"
          to="/user/forgot-password"
        >
          Quên mật khẩu ?
        </Link>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Đăng Nhập
        </button>
        {messageLogin ? (
          <p className=" text-[1.8rem] text-[red] mt-7">{messageLogin}</p>
        ) : null}
      </form>

      {isLoading && (
        <span className="loader w-[48px] h-[48px] fixed top-[50%] left-[49%] z-[9998]"></span>
      )}
    </div>
  );
}

export default Login;
