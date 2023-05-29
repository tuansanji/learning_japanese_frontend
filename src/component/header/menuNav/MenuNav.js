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
  const [current, setCurrent] = useState("");

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
        {
          label: "Ôn Thi Tokutei",
          key: "tokutei",
        },
      ],
    },

    {
      label: "Hướng Dẫn",
      key: "guide",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: "Giới thiệu khóa học tiếng nhật",
          key: "Giới-thiệu-khóa-học-tiếng-nhật",
        },

        {
          label: "Chi tiết ký thi JLPT tại Nhật",
          key: "Chi-tiết-ký-thi-JLPT-tại-Nhật",
        },
        {
          label: "Hướng dẫn tiếng nhật cho người mới bắt đầu",
          key: "Hướng-dẫn-tiếng-nhật-cho-người-mới-bắt-đầu",
        },
        {
          label: "Các câu hỏi thường gặp",
          key: "Các-câu-hỏi-thường-gặp",
        },
      ],
    },
    {
      label: <a href="#footer">liên hệ</a>,
      key: "contact",
      icon: <MailOutlined />,
    },
    {
      label: "Blog",
      key: "blogs",
      icon: <BookOutlined />,
    },
  ];

  // phần chuyển trang khi ng dùng nháy vào menu
  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key !== "contact" && e.key !== "blogs") {
      navigate(`/${e.keyPath[1]}/${e.keyPath[0]}`);
      window.scrollTo({
        top: 0,
        behavior: `smooth`,
      });
    } else if (e.key === "blogs") {
      navigate(`/${e.key}`);
    }
  };
  return (
    <Menu
      style={{ width: "100%" }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

export default MenuNav;
