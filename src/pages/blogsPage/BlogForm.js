import { Button, Descriptions, Form, Input } from "antd";
import React, { useState } from "react";
import TinyMce from "../../component/tinyMce/TinyMce";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";
import { LoadingOutlined } from "@ant-design/icons";

const BlogForm = ({ setCount, setModal, isEdit = false, blogData = null }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  //hàm submit form
  const onFinish = (data) => {
    setLoading(true);
    if (!isEdit) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/blog/add`,
          {
            ...data,
            content,
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          dispatch(toastSuccess(res?.data));
          setCount((prev) => prev + 1);
          setModal(false);
        })
        .catch((err) => {
          setLoading(false);
          dispatch(toastErr(err?.response?.data));
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/blog/edit`,
          {
            ...data,
            content,
            id: blogData._id,
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          dispatch(toastSuccess(res?.data));
          setCount((prev) => prev + 1);
          setModal(false);
        })
        .catch((err) => {
          setLoading(false);
          dispatch(toastErr(err?.response?.data));
        });
    }
  };
  //giá trị ban đầu của form
  const initialValues = blogData
    ? {
        title: blogData.title,
        img: blogData.img,
        des: blogData.des,
        content: blogData.content,
      }
    : {};

  return (
    <div>
      <Form
        initialValues={initialValues}
        size="large"
        layout="vertical"
        name={"blogs"}
        form={form}
        onFinish={onFinish}
      >
        <Descriptions
          bordered
          column={1}
          labelStyle={{
            width: "15%",
            textAlign: "start",
            verticalAlign: "top",
          }}
          contentStyle={{
            textAlign: "start",
            verticalAlign: "top",
            width: "85%",
          }}
        >
          <Descriptions.Item label="Tiêu đề" span={1}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ",
                },
              ]}
            >
              <Input placeholder="tiêu đề...." />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Link ảnh" span={1}>
            <Form.Item
              name="img"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ",
                },
              ]}
            >
              <Input placeholder="Link ảnh...." />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={1}>
            <Form.Item
              name="des"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền đầy đủ",
                },
              ]}
            >
              <Input placeholder="Điền mô tả...." />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung" span={1}>
            <TinyMce
              setContent={setContent}
              content={content}
              blogData={blogData}
            />
          </Descriptions.Item>
        </Descriptions>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 0,
          }}
        >
          <Button
            type="default"
            icon={loading ? <LoadingOutlined /> : null}
            htmlType="submit"
          >
            {isEdit ? "Chỉnh sửa" : "Tạo mới"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogForm;
