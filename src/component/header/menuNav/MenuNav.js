import { useNavigate } from "react-router-dom";

import {
  AppstoreOutlined,
  MailOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";

function MenuNav() {
  const navigate = useNavigate();
  const items = [
    {
      label: "Khóa học",
      key: "courses",
      icon: <BookOutlined />,
      children: [
        {
          label: "N1",
          key: "n1",
        },

        {
          label: "N2",
          key: "n2",
        },
        {
          label: "N3",
          key: "n3",
        },
        {
          label: "N4",
          key: "n4",
        },
        {
          label: "N5",
          key: "n5",
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
      label: <a href="#footer">liên hệ</a>,
      key: "contact",
      icon: <MailOutlined />,
    },
    {
      disabled: true,
      label: (
        <span target="_blank" rel="noopener noreferrer" disabled>
          ADMIN
        </span>
      ),
      key: "admin",
    },
  ];
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key !== "contact" && e.key !== "admin") {
      navigate(`/${e.keyPath[1]}/${e.keyPath[0]}`);
      window.scrollTo({
        top: 0,
        behavior: `smooth`,
      });
    }
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
