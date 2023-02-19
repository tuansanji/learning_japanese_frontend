import { useNavigate } from "react-router-dom";

import {
  AppstoreOutlined,
  MailOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./menuNav.scss";

function MenuNav() {
  const navigate = useNavigate();
  const items = [
    {
      label: <Link to="/course">Khóa Học</Link>,
      key: "courses",
      icon: <BookOutlined />,
      children: [
        {
          type: "group",
          label: "Khóa học Dũng Mori",
          children: [
            {
              label: "N1",
              key: "dung-mori-n1",
            },

            {
              label: "N2",
              key: "dung-mori-n2",
            },
            {
              label: "N3",
              key: "dung-mori-n3",
            },
            {
              label: "N4",
              key: "dung-mori-n4",
            },
          ],
        },
        {
          type: "group",
          label: "Khóa học Riki",
          children: [
            {
              label: "N1",
              key: "riki-n1",
            },

            {
              label: "N2",
              key: "riki-n2",
            },
            {
              label: "N3",
              key: "riki-n3",
            },
            {
              label: "N4",
              key: "riki-n4",
            },
          ],
        },
      ],
    },

    {
      label: "Hướng Dẫn",
      key: "guide",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: "Cách đăng kí tài khoản",
          key: "cach-dang-ki-tai-khoan",
        },

        {
          label: "Sửa lỗi không thể mua khóa học",
          key: "sua-loi-khong-the-mua-khoa-hoc",
        },
        {
          label: "Cách mua khóa học nhanh",
          key: "cach-mua-khoa-hoc-nhanh",
        },
        {
          label: "Cách đăng kí trở thành người dạy trong trung tâm",
          key: "cach-dang-ki-tro-thanh-nguoi-day-trung-tam",
        },
      ],
    },
    {
      label: "Liên Hệ",
      key: "contact",
      icon: <MailOutlined />,
    },
    {
      disabled: true,
      label: (
        <a href="/admin" target="_blank" rel="noopener noreferrer">
          ADMIN
        </a>
      ),
      key: "alipay",
    },
  ];
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(
      e.keyPath.length > 1
        ? `/${e.keyPath[1]} /${e.keyPath[0]}`
        : `/${e.keyPath[0]}`
    );
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

export default MenuNav;
