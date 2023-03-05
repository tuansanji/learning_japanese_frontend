import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../redux/apiRequest";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageRegister = useSelector((state) => {
    return state.auth.register.msg;
  });
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Too Short!")
      .max(18, "Too Long!")
      .required("Required"),
    email: yup.string().email(),
    password: yup
      .string()
      .min(6, "Too Short!")
      .max(18, "Too Long!")
      .required("Required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: "",
    },

    onSubmit: (user) => {
      registerUser(user, dispatch, navigate);
    },
    validationSchema: validationSchema,
  });
  return (
    <div className="flex justify-center mt-[4rem] mx-[2rem] rounded-2xl overflow-hidden">
      {" "}
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="w-full max-w-[600px] p-10 bg-white rounded-lg shadow"
        aria-label="signup-form"
      >
        <h2 className="mb-10 text-3xl font-bold text-center">ĐĂNG KÝ</h2>
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
            type="text"
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Điền tên đăng nhập..."
          />
          {formik.errors.username && formik.touched.username && (
            <p className="error text-[red]">{formik.errors.username}</p>
          )}
        </div>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label
            htmlFor="email"
            className="text-2xl font-medium cursor-pointer"
          >
            Email
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            type="email"
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Email..."
          />
          {formik.errors.email && formik.touched.email && (
            <p className="error text-[red]">{formik.errors.email}</p>
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
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label
            htmlFor="passwordConfirmation"
            className="text-2xl font-medium cursor-pointer"
          >
            Nhập lại mật khẩu
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
            id="passwordConfirmation"
            type="password"
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Nhập lại mật khẩu..."
          />
          {formik.errors.passwordConfirmation &&
            formik.touched.passwordConfirmation && (
              <p className="error text-[red]">
                {formik.errors.passwordConfirmation}
              </p>
            )}
        </div>
        <div className="flex items-center justify-end mb-5 text-slate-400">
          <p className="mr-2">Bạn đã có tại khoản? </p>
          <Link to="/auth/login" className="text-blue-500 underline">
            Đăng nhập ngay
          </Link>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Đăng kí
        </button>
        {messageRegister ? (
          <p className=" text-[1.8rem] text-[red] mt-7">{messageRegister}</p>
        ) : null}
      </form>
    </div>
  );
}

export default Register;
