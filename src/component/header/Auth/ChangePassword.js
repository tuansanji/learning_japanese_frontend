import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
const ResetPassword = ({ match }) => {
  const [msg, setMsg] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const handleResetPassword = async (password) => {
    await axios
      .patch(
        `${process.env.REACT_APP_BACKEND_URL}/user/confirm-password/${params.token}`,
        {
          password,
        }
      )
      .then((res) => {
        setMsg(res.data.message);
        navigate("/auth/login");
      })
      .catch((err) => setMsg(err.response.data.message));
  };

  const validationSchema = yup.object().shape({
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
      password: "",
      passwordConfirmation: "",
    },

    onSubmit: (password) => {
      handleResetPassword(password.password);
    },
    validationSchema: validationSchema,
  });
  return (
    <div>
      <div className=" flex w-[50%] mx-auto h-[39rem] mt-[4rem] bg-slate-100 flex-col ">
        <div className="w-full bg-[rgb(151,73,245)]  h-[5rem] flex items-center justify-center">
          <h1 className="text-[2.5rem] text-[white]">Thay đổi mật khẩu</h1>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="flex gap-x-5 mx-auto mt-10 w-[80%] "
          aria-label="simple-form"
        >
          <Space direction="vertical w-[90%] ">
            <div className="flex justify-between items-center gap-10">
              <label htmlFor="" className="flex-shrink-0">
                Nhập mật khẩu :
              </label>
              <Input.Password
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-[37rem]"
                placeholder="Điền mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {formik.errors.password && formik.touched.password && (
                <p className="error text-[red]">{formik.errors.password}</p>
              )}
            </div>
            <div className="flex justify-between items-center gap-10">
              <label htmlFor="" className="flex-shrink-0">
                Nhập lại mật khẩu :
              </label>
              <Input.Password
                name="passwordConfirmation"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
                className="w-[37rem]"
                placeholder="Điền lại mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {formik.errors.passwordConfirmation &&
                formik.touched.passwordConfirmation && (
                  <p className="error text-[red]">
                    {formik.errors.passwordConfirmation}
                  </p>
                )}
            </div>
          </Space>
          <div className="flex items-center justify-center ml-6">
            <button
              type="submit"
              className=" px-8 py-3   bg-[#9C27B0] text-[#fff] rounded-2xl hover:bg-green-400"
            >
              Lưu
            </button>
          </div>
        </form>
        <div className="h-[4rem] w-full flex justify-center items-center mt-5">
          <p className="text-[red] text-[1.6rem] font-bold">{msg}</p>
        </div>

        <div className="flex flex-col mt-7 mx-auto w-[90%] mb-[1rem] p-[2rem] leading-4 shadow-desc ">
          <span className="font-bold leading-5">
            <span className="text-black">&nbsp;Lưu ý:</span>
          </span>
          <br />
          <span className="text-[#222222]">
            » Mật khẩu có thể gồm các kí tự chuỗi và số ( 6 - 18).
          </span>
          <br />
          <span className="text-[#222222]">
            » Mật khẩu chỉ được thay trong thời hạn 1 tiếng kể từ khi bắt đầu
            yêu cầu.
          </span>
          <br />

          <span className="text-[#222222]">
            » Nếu vẫn không thể thay đổi mật khẩu. Vui lòng liên hệ admin bằng
            thông tin dưới cuối trang.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
