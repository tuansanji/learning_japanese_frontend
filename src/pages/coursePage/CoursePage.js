import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import {
  Modal,
  Result,
  Button as ButtonAnt,
  Form,
  Row,
  Col,
  Input,
  Select,
  Switch,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import CourseItemPage from "./CourseItemPage";
import DrawerApp from "../../component/SupportTab/Drawer";
import { toastErr, toastSuccess } from "../../redux/slice/toastSlice";
const { Option } = Select;

function CoursePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [message, setMessage] = useState(null);
  const [editMessage, setEditMessage] = useState(1);
  const [loadingSwitch, setLoadingSwitch] = useState(false);

  const user = useSelector((state) => {
    return state.auth?.login?.currentUser;
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditMessage = () => {
    setOpenDrawer(true);
  };

  // open modal với session
  useEffect(() => {
    if (!sessionStorage.getItem("messageHomePage")) {
      setIsModalOpen(true);
      sessionStorage.setItem("messageHomePage", true);
    }
  }, []);

  // lấy thông báo
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tip/messageHomePage`)
      .then((res) => setMessage(res?.data));
  }, [editMessage]);

  return (
    <div className="">
      {user && user.isAdmin && message && (
        <Switch
          loading={loadingSwitch}
          checkedChildren="Tắt thông báo trang chủ"
          unCheckedChildren="Bật thông báo trang chủ"
          defaultChecked={message?.open}
          className="bg-red-500"
          onChange={(open) => {
            setLoadingSwitch(true);
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}/tip/messageHomePage`,
                { ...message, open },
                {
                  headers: {
                    token: `Bearer ${user.accessToken}`,
                  },
                }
              )
              .then((res) => {
                setLoadingSwitch(false);
              })
              .catch((err) => {});
          }}
        />
      )}
      {message && message.open && (
        <Modal
          title="Thông báo"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={false}
        >
          <Result
            status={message?.status || "400"}
            // status="warning"
            title={<p className="font-bold text-[red]">{message?.title}</p>}
            subTitle={
              <p className="font-bold text-[#333]">{message?.message}</p>
            }
            extra={
              user &&
              user.isAdmin && (
                <ButtonAnt
                  type="primary"
                  className="bg-red-600"
                  onClick={handleEditMessage}
                >
                  Chỉnh sửa
                </ButtonAnt>
              )
            }
          />

          <DrawerApp
            setOpenDrawer={setOpenDrawer}
            openDrawer={openDrawer}
            title="Chỉnh sửa thông báo"
          >
            <FormMessageHomePage
              message={message}
              setEditMessage={setEditMessage}
            />
          </DrawerApp>
        </Modal>
      )}
      <CourseItemPage
        level="n1"
        img="https://jlpt.site/files/img/n1-20211014074403.png"
        lesson="192"
        state="137"
        hour="1300"
        hourLearn="40"
        title={[
          "– Sử dụng tiếng Nhật tự nhiên như người bản xứ",
          "– Không gặp trở ngại nào trong giao tiếp ",
          "– Có thể tự tin chọn công việc mình yêu thích với mức lương không thua kém người Nhật",
        ]}
      />
      <CourseItemPage
        level="n2"
        img="https://jlpt.site/files/img/n2-20211014074403.png"
        lesson="161"
        state="141"
        hour="1455"
        hourLearn="80"
        title={[
          "– Có thể xem phim không cần phụ đề",
          "– Có thể làm biên dịch, phiên dịch",
          "– Có thể giao tiếp thoải mái và tự tin với người bản xứ",
        ]}
      />{" "}
      <CourseItemPage
        level="n3"
        img="https://jlpt.site/files/img/n3-20211014074403.png"
        lesson="137"
        state="128"
        hour="1253"
        hourLearn="90"
        title={[
          "– Có thể làm phiên dịch cơ bản",
          "– Xem phim, nghe tin tức nắm được ý chính",
          "– Có thể làm việc với tư cách kỹ sư tại nhà máy",
        ]}
      />{" "}
      <CourseItemPage
        level="n4"
        img="https://jlpt.site/files/img/n4-20211014074403.png"
        lesson="25"
        state="145"
        hour="36"
        hourLearn="45"
        title={[
          "– Tự tin giao tiếp tại những nơi công cộng",
          "– Có thể làm việc tại nhà hàng, công xưởng, viện dưỡng lão, đăng ký học tại một số trường Nhật ngữ.",
          "– Xem được phim có thoại ko quá khó",
        ]}
      />{" "}
      <CourseItemPage
        level="n5"
        img="https://jlpt.site/files/img/n5-20211014074403.png"
        lesson="25"
        state="159"
        hour="45"
        hourLearn="15"
        title={[
          "– Giao tiếp cơ bản",
          "– Xem được phim hoạt hình đơn giản",
          "– Có thể làm việc tại một số nhà máy của Nhật không yêu cầu tiếng quá cao",
        ]}
      />
      <div className=" w-[960px] h-[200px] md:h-[300px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]  ">
        <div className="flex gap-[1rem] h-[100%]  p-5 sm:p-0   overflow-hidden">
          <div className="flex flex-col items-center justify-center flex-1 gap-3 movies__course">
            <div className="flex flex-row md:flex-col gap-5 h-full  mx-auto w-full p-[2rem] leading-4 shadow-desc text-[1.6rem]">
              <div className="flex items-center justify-center flex-1">
                <Link className="" to={`/movies`}>
                  <Button
                    variant="contained"
                    className="h-[6rem]  hover:right-2 relative md:w-[300px]  shadow-2xl"
                    color="primary"
                    style={{ fontSize: "1.4rem", textTransform: "capitalize" }}
                  >
                    Học Tiếng Nhật Qua Phim
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* phần bài thi */}
      <div className=" w-[960px] h-[200px] md:h-[300px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]  ">
        <div className="flex gap-[1rem] h-[100%]  p-5 sm:p-0  bg-[#ded7e1] overflow-hidden">
          <div className="overflow-hidden rounded-2xl shadow-desc md:hidden ">
            <img
              src={
                "https://trungtamnhatngu.edu.vn/uploads/blog/2018_10/ky-thi-nang-luc-tieng-nhat-jlpt.png"
              }
              alt=""
              className="object-cover h-full overflow-hidden"
            />
          </div>
          <div className="flex flex-1  justify-center items-center flex-col gap-3 bg-[#fff]">
            <div className="flex flex-row md:flex-col gap-5 h-full  mx-auto w-full p-[2rem] leading-4 shadow-desc text-[1.6rem]">
              <div className="">
                <span className="text-[#333] font-medium leading-10">
                  » Đề thi JLPT các năm.
                </span>
                <br />
                <span className="text-[#333] font-medium leading-10">
                  » Đề thi chuẩn.
                </span>
                <br />
                <span className="text-[#333] font-medium leading-10">
                  » Cập nhật liên tục và chính xác đề thi các năm.
                </span>
                <br />{" "}
                <span className="text-[#333] font-medium leading-10">
                  » Mẫu đề thi chuẩn được cập nhật liên tục.
                </span>
                <br />{" "}
                <span className="text-[#333] font-medium leading-10">
                  » Kho đề thi tiếng Nhật hoàn toàn miễn phí.
                </span>
                <br />{" "}
              </div>
              <div className="flex items-center justify-center flex-1">
                <Link className="" to={`/courses/mockTest`}>
                  <Button
                    variant="contained"
                    className="h-[4rem]  hover:h-[4.5rem] md:w-[300px]  shadow-2xl"
                    color="primary"
                    style={{ fontSize: "1.4rem", textTransform: "capitalize" }}
                  >
                    Vào thi ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[960px] h-[200px] md:h-[300px] top-[95px] border border-[#000000] rounded-[10px] text-[12px] mx-auto my-[4rem] sm:my-[2rem] overflow-hidden xl:w-[90%] md:w-[90%]  ">
        <div className="flex gap-[1rem] h-[100%]  p-5 sm:p-0  bg-[#ded7e1] overflow-hidden">
          <div className="overflow-hidden rounded-2xl shadow-desc md:hidden tablet:w-[308px] ">
            <img
              src={
                "https://duhocminhkhang.com/wp-content/uploads/2019/09/Visa-tokutei-ginou-tai-nhat.jpg"
              }
              alt=""
              className="object-cover w-full h-full overflow-hidden"
            />
          </div>
          <div className="flex flex-1  justify-center items-center flex-col gap-3 bg-[#fff]">
            <div className="flex flex-row md:flex-col gap-5 h-full  mx-auto w-full p-[2rem] leading-4 shadow-desc text-[1.6rem]">
              <div className="  md:flex-1 tablet:w-[380px]">
                <span className="text-[#333] font-bold  text-[1.8rem] ml-4 leading-10">
                  Tokutei là gì – Visa tokutei là gì?
                </span>
                <br />
                <span className="text-[#333] font-medium leading-10">
                  » Tháng 4/2019 Nhật Bản chính thức đưa ra chương trình Visa
                  Tokutei. Chương trình này mở rộng đến tất cả các đối tượng đủ
                  độ tuổi trên 18, đủ sức khỏe và mong muốn sang Nhật Bản làm
                  việc
                </span>
              </div>
              <div className="flex items-center justify-center flex-1">
                <Link className="" to={`/courses/tokutei`}>
                  <Button
                    variant="contained"
                    className="h-[4rem] text-[2rem] hover:h-[4.5rem] md:w-[200px] sm:flex-1"
                    color="secondary"
                  >
                    Xem chi tiết khóa học
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CoursePage);

const FormMessageHomePage = ({ message, setEditMessage }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.auth?.login?.currentUser;
  });
  const handleSubmit = (data) => {
    if (data) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/tip/messageHomePage`,
          {
            message: data?.message,
            title: data?.title,
            status: data?.status,
            open: data?.open,
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          dispatch(toastSuccess("Chỉnh sửa thành công"));
          setEditMessage((prev) => prev + 1);
        })
        .catch((err) => {
          dispatch(toastErr("Chỉnh sửa thất bại"));
        });
    }
  };
  return (
    <Form
      layout="vertical"
      // hideRequiredMark
      initialValues={message}
      onFinish={handleSubmit}
      form={form}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tiêu đề",
              },
            ]}
          >
            <Input placeholder="Điền tiêu đề thông báo..." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái của thông báo",
              },
            ]}
          >
            <Select placeholder="Vui lòng chọn trạng thái của thông báo">
              <Option value="success">Success</Option>
              <Option value="warning">Warning</Option>
              <Option value="403">403</Option>
              <Option value="404">404</Option>
              <Option value="500">500</Option>
              <Option value="error">Error</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="message"
            label="Message"
            rules={[
              {
                required: true,
                message: "Bắt buộc điền thông báo",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Thông báo..." />
          </Form.Item>
        </Col>
      </Row>
      <ButtonAnt
        htmlType="submit"
        type="primary"
        className="mx-auto bg-red-500 "
      >
        Xác nhận
      </ButtonAnt>
    </Form>
  );
};
