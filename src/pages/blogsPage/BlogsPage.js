import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../component/SupportTab/Loading";
import { Button, Modal, Popconfirm } from "antd";
import BlogForm from "./BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";

const BlogsPage = () => {
  const [listBlog, setListBlog] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });

  const handleCancel = () => {
    setModal(false);
  };
  //hàm xóa bài blog
  const handleDelete = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/blog/delete`,
        {
          id,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(toastSuccess(res?.data));
        setCount((prev) => prev + 1);
      })
      .catch((err) => {
        dispatch(toastErr(err?.response?.data));
      });
  };

  //lấy all blog
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/blog/all`)
      .then((response) => {
        setLoading(false);
        setListBlog(response?.data);
      });
  }, [count]);

  return (
    <div className="relative p-[2rem] mt-[3rem]  gap-[3rem] ssm:gap-[2rem] w-[80%] md:w-[90%] sm:w-full mx-auto flex flex-col">
      <>
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
          <BlogForm setModal={setModal} setCount={setCount} />
        </Modal>
      </>
      <div className="flex gap-[5px]">
        <Link to="/">
          <span className="hover:text-[blue]">Trang chủ</span>
        </Link>
        <span> &gt; </span> <span className="text-[red]">Bài viết nổi bật</span>{" "}
      </div>
      {user && user.isAdmin && (
        <Button
          className="bg-blue-600 text-white"
          type="default"
          onClick={() => {
            setModal(true);
          }}
        >
          Tạo mới
        </Button>
      )}
      {!loading && listBlog ? (
        listBlog.map((item) => (
          <div
            key={item?._id}
            className="flex gap-6 h-[15rem]  sm:border-b-2 border-[#333] sm:pb-[2rem] ssm:gap-3"
          >
            <div className=" w-[30%] md:w-[40%] sm:hidden h-full  shadow-desc ">
              <Link to={`/blogs/${item?._id}`}>
                <img
                  src={item?.img}
                  className="w-full h-full hover:opacity-70"
                  alt={item?.title}
                />
              </Link>
            </div>
            <div className="w-full h-full overflow-hidden ">
              <Link to={`/blogs/${item?._id}`}>
                <h1 className="text-[2rem] font-bold hover:text-[red]">
                  {item?.title}
                </h1>
              </Link>
              <p className="overflow-ellipsis">{item?.des}</p>
            </div>
            {user && user.isAdmin && (
              <Popconfirm
                placement="right"
                title="Chắc chắn xóa"
                description="Đọc kĩ"
                onConfirm={() => handleDelete(item?._id)}
                okText="Xác nhận"
                cancelText="Hủy bỏ"
                okButtonProps={{ style: { backgroundColor: "red" } }}
              >
                <Button className="bg-red-500 text-white" type="default">
                  Xóa
                </Button>
              </Popconfirm>
            )}
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default BlogsPage;
