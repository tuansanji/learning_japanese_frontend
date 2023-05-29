import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import BlogForm from "./BlogForm";
import Loading from "../../component/SupportTab/Loading";

const Blog = () => {
  const params = useParams();
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(1);

  // lấy dữ liệu của blog
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blog/${params?.id}`)
      .then((response) => {
        setLoading(false);
        setBlog(response?.data);
      });
  }, [params, count]);

  const handleCancel = () => {
    setModal(false);
  };
  return !loading && blog ? (
    <div className="relative p-[2rem] ssm:p-0 bg-white   w-full flex flex-col">
      <div className="flex gap-[5px] ssm:gap-[1px] ssm:text-[1.2rem]">
        <Link to="/">
          <span className="hover:text-[blue]">Trang chủ</span>
        </Link>
        <span> &gt; </span>{" "}
        <Link to="/blogs">
          <span className="hover:text-[blue]">Bài viết nổi bật</span>{" "}
        </Link>{" "}
        &gt;
        <span className="text-[red]">{blog && blog?.title}</span>
      </div>
      {user && user.isAdmin && (
        <Button
          className="bg-blue-600 text-white"
          type="default"
          onClick={() => {
            setModal(true);
          }}
        >
          Chỉnh sửa
        </Button>
      )}
      <Modal
        title=""
        width="70%"
        open={modal}
        onCancel={handleCancel}
        maskClosable={false}
        style={{ top: "50px" }}
        footer={[]}
        className="task__modal__responsive"
      >
        <BlogForm
          setModal={setModal}
          setCount={setCount}
          isEdit={true}
          blogData={blog}
        />
      </Modal>
      <div className="p-[6rem] md:p-[3rem] sm:p-[1rem] pt-7 ">
        <h1 className="text-[3.5rem] md:text-[2.5rem]  sm:text-[2rem] ssm:text-[1.7rem] text-[#333] font-bold pb-[2rem] ">
          {blog.title}
        </h1>

        <div className="main__tinymce">{parse(blog.content)}</div>
      </div>
    </div>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Blog;
