import moment from "moment";
import { io } from "socket.io-client";
import { useEffect, useState, memo, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Table,
  Button,
  Descriptions,
  message,
  Popconfirm,
  Select,
} from "antd";
import { Input } from "antd";
import {
  deleteManyUser,
  deleteUser,
  editUserRequest,
  getAllUsers,
} from "../../../../redux/apiRequest";
import Loading from "../../../SupportTab/Loading";

import { createAxios } from "../../../../redux/createInstance";
import { getAllUsersSuccess } from "../../../../redux/slice/userSlice";
import axios from "axios";
import { toastErr, toastSuccess } from "../../../../redux/slice/toastSlice";
// import socket from "../../../content/Container";
const defaultExpandable = {
  expandedRowRender: (record) => <div>{record.description}</div>,
};
// const socket = io(process.env.REACT_APP_BACKEND_URL);
const MenuUser = ({ currentUser }) => {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [searchSelector, setSearchSelector] = useState("username");
  const [inputSearch, setInputSearch] = useState("");
  const [editUser, setEditUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [newUserEdit, setNewUserEdit] = useState({
    id: "",
    username: "",
    email: "",
    money: "",
  });
  const [buyCourses, setBuyCourses] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, getAllUsersSuccess);
  const [userTest, setUserTest] = useState("");
  // lấy dữ liệu số người đang online từ server
  // useEffect(() => {
  //   socket.on("userCount", (count) => {
  //     setOnlineUsers(count);
  //   });

  //   return () => {
  //     socket.emit("disconnect", user._id);
  //   };
  // }, []);

  useEffect(() => {
    getAllUsers(user?.accessToken, dispatch, axiosJWT).then((users) => {
      setIsLoading(false);
      setListUsers(users);
    });
  }, [updatedUser]);
  const { TextArea } = Input;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      sorter: (a, b) => a.admin.localeCompare(b.admin),
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: [
        {
          text: "Gmail",
          value: "gmail",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Icloud",
          value: "icloud",
        },
      ],
      onFilter: (value, record) => {
        const domain = record.email.split("@")[1];
        if (value === "gmail") {
          return domain === "gmail.com";
        } else if (value === "email") {
          return domain === "email.com";
        } else if (value === "icloud") {
          return domain === "icloud.com";
        }
        return false;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          className="bg-red-500 flex items-center"
          type="primary"
          onClick={() => {
            if (window.confirm(`Bạn có chắc chắn muốn xóa ${record.name} ?`)) {
              handleDeleteUser(record.id);
            } else {
              // Nếu người dùng chọn Cancel
              // Hủy bỏ hành động của bạn ở đây
            }
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const text = "Bạn có chắc chắn muốn sửa?";
  const description = "are you sure...";
  // hàm xác nhận sửa user
  const confirmEdit = () => {
    handleEditUser();
    setEditUser(false);
    message.info("Sửa thành công");
  };

  const filteredData = listUsers.filter((item) => {
    return item[searchSelector]
      .toLowerCase()
      .includes(inputSearch.toLowerCase());
  });

  const data = [];
  if (filteredData) {
    filteredData.forEach((user, index) => {
      data.push({
        key: index,
        money: user.money,
        name: user.username,
        id: user._id,
        email: user.email,
        courses: user.courses,
        admin: user.isAdmin ? "Admin" : "Thành viên",
        isEdit: false,
        description: (
          <Descriptions
            className="bg-red"
            bordered
            title="Chi tiết tài khoản"
            size="large"
            extra={
              <div className="flex gap-[2rem]">
                {editUser && (
                  <Popconfirm
                    placement="top"
                    title={text}
                    description={description}
                    onConfirm={confirmEdit}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ className: "my-ok-button-class" }}
                  >
                    <Button
                      className="bg-green-500 flex items-center"
                      type="primary"
                    >
                      Save
                    </Button>
                  </Popconfirm>
                )}
                <Button
                  className="bg-green-500 flex items-center"
                  type="primary"
                  onClick={() => {
                    data[index].isEdit = !data[index].isEdit;

                    setEditUser(!editUser);
                  }}
                >
                  {editUser ? "Cancel" : "Edit"}
                </Button>
              </div>
            }
          >
            <Descriptions.Item label="ID">{user._id}</Descriptions.Item>
            <Descriptions.Item label="Tên">
              {editUser ? (
                <TextArea
                  placeholder={user.username}
                  value={newUserEdit.username}
                  allowClear
                  onChange={(e) => {
                    setNewUserEdit({
                      ...newUserEdit,
                      username: e.target.value,
                    });
                  }}
                />
              ) : (
                user.username
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {editUser ? (
                <TextArea
                  placeholder={user.email}
                  value={newUserEdit.email}
                  allowClear
                  onChange={(e) => {
                    setNewUserEdit({
                      ...newUserEdit,
                      email: e.target.value,
                    });
                  }}
                />
              ) : (
                user.email
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Khóa Học">
              {editUser ? (
                <TextArea
                  placeholder={user.courses.join(", ")}
                  allowClear
                  value={buyCourses}
                  onChange={(e) => setBuyCourses(e.target.value)}
                />
              ) : user.courses.length < 1 ? (
                "chưa có khóa học nào..."
              ) : (
                user.courses.map((course, index) => (
                  <span key={index}>{course},</span>
                ))
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Tiền">
              {editUser ? (
                <TextArea
                  placeholder={`${user.money} $`}
                  allowClear
                  value={newUserEdit.money}
                  onChange={(e) => {
                    setNewUserEdit({
                      ...newUserEdit,
                      money: e.target.value,
                    });
                  }}
                />
              ) : (
                `${user.money} $`
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Chức vụ">
              {user.isAdmin ? "admin" : "thành viên"}
            </Descriptions.Item>
            <Descriptions.Item label="Thông tin chi tiết">
              Thời gian tạo nick:{" "}
              {moment(user.createdAt).format("DD/MM/YYYY HH:mm")}
              <br />
              Sửa đổi gần nhất:{" "}
              {moment(user.updatedAt).format("DD/MM/YYYY HH:mm")}
              <br />
              Tổng số khóa học đã mua: {user.courses.length}
            </Descriptions.Item>
          </Descriptions>
        ),
      });
    });
  }
  // phần footer
  const selectedRows = data
    .filter((record, index) => selectedRowKeys.includes(index))
    .map((record) => record.id);

  const defaultFooter = () => {
    return (
      <div>
        <p>
          Tổng số tài khoản :{" "}
          <span style={{ color: "red", fontWeight: 600, fontSize: "1.8rem" }}>
            {listUsers.length}
          </span>
        </p>
        <p style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          Tổng số tài khoản đang được chọn :
          <span style={{ color: "red", fontWeight: 600, fontSize: "1.8rem" }}>
            {" "}
            {selectedRows.length}
          </span>
          {selectedRows.length > 0 && (
            <Button
              className="bg-red-500 flex items-center"
              type="primary"
              onClick={() => {
                if (window.confirm(`Bạn có chắc chắn muốn xóa ?`)) {
                  deleteManyUser(
                    currentUser.accessToken,
                    selectedRows,
                    axiosJWT
                  );
                  setUpdatedUser(selectedRows);
                  setSelectedRowKeys([]);
                } else {
                  // Nếu người dùng chọn Cancel
                  // Hủy bỏ hành động của bạn ở đây
                }
              }}
            >
              Xóa Hàng loạt
            </Button>
          )}
        </p>
      </div>
    );
  };
  const scroll = {};

  const tableColumns = columns.map((item) => ({
    ...item,
  }));

  // Phần xử lí khi người dùng nháy vào phần mở rộng
  const handleExpand = (expanded, record) => {
    // "expanded" (boolean) và "record" (đối tượng dữ liệu của hàng được mở rộng)

    setEditUser(false);
    setNewUserEdit({
      id: record.id,
      username: record.name,
      email: record.email,
      money: record.money,
      courses: record.courses,
    });
    setSelectedRecord(expanded ? record : null);
  };
  const isRecordSelected = (record) => {
    return selectedRecord && selectedRecord.id === record.id;
  };
  const getRowClassName = (record, index) => {
    return isRecordSelected(record) ? "userAdmin__active" : "";
  };

  //phần xét tài khoản test

  const handleSetUserTest = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/setTestUser`,
        {
          username: userTest,
          admin: user.username,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(toastSuccess(res.data));
        setUserTest("");
      })
      .catch((err) => dispatch(toastErr(err.response.data)));
  };

  // Phần xử lí cập nhật chỉnh sử user
  const handleEditUser = () => {
    let courses = buyCourses.split(",");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/buyCourse`,
        {
          username: newUserEdit.username,
          courses: courses,
        },
        {
          headers: { token: `Bearer ${user.accessToken}` },
        }
      )
      .then((response) => dispatch(toastSuccess(response.data)))
      .catch((err) => dispatch(toastErr(err.response.data)));
    // cận thận vì khi nháy nút edit thì tất cả các thẻ sẽ chuyển sang chế độ isedit bằng true nên. có thể fix bằng cách chỉnh lại logic của onClick nút edit. Chúng ta sẽ ẩn hoặc mở nút Save của chính thẻ đó
    editUserRequest(currentUser.accessToken, newUserEdit, axiosJWT);
    setUpdatedUser(newUserEdit);
  };
  //phần xử lí xóa user
  const handleDeleteUser = (id) => {
    deleteUser(currentUser.accessToken, id, axiosJWT);
    setUpdatedUser(id);
  };
  const tableProps = {
    expandable: {
      ...defaultExpandable,
      onExpand: handleExpand,
      expandRowByClick: false,
    },
    footer: defaultFooter,
    rowSelection: {
      type: "checkbox",
      selectedRowKeys,
      onChange: setSelectedRowKeys,
    },
    rowClassName: getRowClassName,
  };

  return (
    <>
      {isLoading && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div>
        {onlineUsers && (
          <p>Hệ thống có tổng cộng: {onlineUsers} người đang online.</p>
        )}
      </div>

      <div className="my-[2rem]">
        <Form.Item label="Fields" className="w-[30rem]">
          <Select
            value={searchSelector}
            onChange={(value) => {
              setSearchSelector(value);
            }}
          >
            <Select.Option value="username">username</Select.Option>
            <Select.Option value="email">email</Select.Option>

            <Select.Option value="_id">id</Select.Option>
          </Select>
        </Form.Item>
        <div className="flex h-[3rem] gap-5 items-center">
          <label htmlFor="inputSearch">Search: </label>
          <input
            id="inputSearch"
            className="border border-[#333] outline-none h-full w-[40rem]  rounded-xl px-3"
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex mt-5 h-[3rem] gap-5 items-center">
          <button
            onClick={handleSetUserTest}
            className="rounded-2xl bg-slate-300 active:opacity-25 h-full px-2 border transition-opacity"
          >
            Xét tài khoản test:{" "}
          </button>
          <input
            id="inputSearch"
            className="border border-[#333] outline-none h-full w-[40rem]  rounded-xl px-3"
            placeholder="Điền username..."
            value={userTest}
            onChange={(e) => {
              setUserTest(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      ></Form>
      <Table
        {...tableProps}
        pagination={{
          position: ["none", "bottomRight"],
        }}
        columns={tableColumns}
        dataSource={data}
        scroll={{}}
      />
    </>
  );
};
export default memo(MenuUser);
