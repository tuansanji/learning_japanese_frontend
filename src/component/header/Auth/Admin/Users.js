import moment from "moment";
import { useEffect, useState, memo } from "react";
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
import { Input, Select as SelectAnt } from "antd";

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
import { v4 as uuid } from "uuid";
const defaultExpandable = {
  expandedRowRender: (record) => <div>{record.description}</div>,
};

// phần admin không tối ưu với useCallback, useMemo, memo
const MenuUser = ({ currentUser }) => {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [countMonth, setCountMonth] = useState(0);
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
  // const [buyCourses, setBuyCourses] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, getAllUsersSuccess);
  const [userTest, setUserTest] = useState({
    username: "",
    courses: [],
    month: 1,
  });

  // lấy dữ liệu số người đang online từ server
  // useEffect(() => {
  //   socket.on("userCount", (count) => {
  //     setOnlineUsers(count);
  //   });

  //   return () => {
  //     socket.emit("disconnect", user._id);
  //   };
  // }, []);

  const { TextArea } = Input;

  const options = [
    {
      value: "n1",
      label: "N1",
    },
    {
      value: "n2",
      label: "N2",
    },
    {
      value: "n3",
      label: "N3",
    },
    {
      value: "n4",
      label: "N4",
    },
    {
      value: "n5",
      label: "N5",
    },
    {
      value: "tokutei",
      label: "Tokutei",
    },
  ];

  // select course mua

  // lấy danh sách tài khoản đã đăng kí
  useEffect(() => {
    getAllUsers(user?.accessToken, dispatch, axiosJWT).then((users) => {
      setIsLoading(false);

      setListUsers(users?.users);
      setCountMonth(users?.subData);
    });
  }, [updatedUser]);

  // thông tin table
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
    // message.info("Sửa thành công");
  };

  // filter kết hợp tìm kiếm
  const filteredData = listUsers.filter((item) => {
    return item[searchSelector]
      .toLowerCase()
      .includes(inputSearch.toLowerCase());
  });

  // data cho table
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
              {!user.courses
                ? "chưa có khóa học nào..."
                : Object.keys(user.courses).map((course, index) => (
                    <div key={index} className="row flex my-[1rem]">
                      <div className="">
                        <label className="font-bold">{course} :</label>
                      </div>
                      <div className=" ml-6">
                        <p className="text-[#0062CC] font-bold">
                          {moment(user.courses[course]?.time).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
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
              {/* Tổng số khóa học đã mua: {user.courses.length} */}
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

  // phần xác định và thêm class cho thẻ mở rộng
  const isRecordSelected = (record) => {
    return selectedRecord && selectedRecord.id === record.id;
  };
  // phần xác định và thêm class cho thẻ mở rộng
  const getRowClassName = (record, index) => {
    return isRecordSelected(record) ? "userAdmin__active" : "";
  };

  //phần xét tài khoản test
  const handleSetUserTest = () => {
    if (userTest.username) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/user/setTestUser`,
          // {
          //   username: userTest,
          //   admin: user.username,
          // },
          userTest,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          dispatch(toastSuccess(res.data));
          setUpdatedUser(uuid());
        })
        .catch((err) => dispatch(toastErr(err.response.data)));
    }
  };

  // Phần xử lí cập nhật chỉnh sử user
  const handleEditUser = () => {
    // let courses = buyCourses.split(",");
    // axios
    //   .post(
    //     `${process.env.REACT_APP_BACKEND_URL}/user/edit`,
    //     {
    //       username: newUserEdit.username,
    //       // courses: courses,
    //     },
    //     {
    //       headers: { token: `Bearer ${user.accessToken}` },
    //     }
    //   )
    //   .then((response) => dispatch(toastSuccess(response.data)))
    //   .catch((err) => dispatch(toastErr(err.response.data)));
    // cận thận vì khi nháy nút edit thì tất cả các thẻ sẽ chuyển sang chế độ isedit bằng true nên. có thể fix bằng cách chỉnh lại logic của onClick nút edit. Chúng ta sẽ ẩn hoặc mở nút Save của chính thẻ đó
    editUserRequest(currentUser.accessToken, newUserEdit, axiosJWT)
      .then((response) => dispatch(toastSuccess("Chỉnh sửa thành công")))
      .catch((err) => dispatch(toastErr("Chỉnh sửa thất bại")));
    setUpdatedUser(newUserEdit);
  };
  //phần xử lí xóa user
  const handleDeleteUser = (id) => {
    deleteUser(currentUser.accessToken, id, axiosJWT)
      .then((response) => dispatch(toastSuccess("Chỉnh sửa thành công")))
      .catch((err) => dispatch(toastErr("Chỉnh sửa thất bại")));
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

  //format số tiền
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      {isLoading && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="pt-9 flex flex-col gap-2">
        {/* {onlineUsers && (
          <p>Hệ thống có tổng cộng: {onlineUsers} người đang online.</p>
        )} */}
        <p>
          Số người dùng đã mua:{" "}
          <span className="text-red-500 font-bold">
            {listUsers.filter((user) => {
              if (
                !user.isAdmin &&
                user.username !== "japan123" &&
                user.username !== "ngheoketaupl280921"
              )
                return user.courses;
            }).length || 0}
          </span>{" "}
        </p>
        <p>
          Số tháng đã mua:{" "}
          <span className="text-red-500 font-bold">{countMonth?.month}</span>
        </p>
        <p>
          Số tiền dự tính:{" "}
          <span className="text-red-500 font-bold">
            {VND.format(countMonth?.month * 20000)}
          </span>
        </p>
        <p>
          Thời gian cập nhật mới nhất:
          <span className="text-red-500 font-bold">
            {" "}
            {moment(countMonth.updatedAt).format("DD/MM/YYYY HH:mm")}
          </span>
        </p>
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
            className="rounded-2xl bg-slate-300 active:opacity-25  px-2 border transition-opacity"
          >
            Xác nhận mua:{" "}
          </button>
          <input
            id="inputSearch"
            className="border border-[#333] outline-none h-full w-[40rem]  rounded-xl px-3"
            placeholder="Điền username..."
            value={userTest.username}
            onChange={(e) => {
              setUserTest({
                ...userTest,
                username: e.target.value,
              });
              setInputSearch(e.target.value);
            }}
          ></input>
          <Select
            mode="tags"
            size={"middle"}
            placeholder="Điền khóa học"
            onChange={(value) => {
              setUserTest({
                ...userTest,
                courses: [...value],
              });
            }}
            style={{
              width: "30%",
            }}
            options={options}
          />
          <input
            className="border border-[#333] outline-none h-full w-[20rem]  rounded-xl px-3"
            placeholder="Điền số tháng..."
            type="number"
            value={userTest.month}
            onChange={(e) => {
              setUserTest({
                ...userTest,
                month: e.target.value,
              });
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
