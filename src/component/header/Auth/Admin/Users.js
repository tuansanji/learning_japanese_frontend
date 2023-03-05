import moment from "moment";
import {
  Form,
  Space,
  Table,
  Button,
  Descriptions,
  message,
  Popconfirm,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteManyUser,
  deleteUser,
  editUserRequest,
  getAllUsers,
} from "../../../../redux/apiRequest";

import { Input } from "antd";
const defaultExpandable = {
  expandedRowRender: (record) => <div>{record.description}</div>,
};

const MenuUser = ({ currentUser }) => {
  const [editUser, setEditUser] = useState(false);
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("large");
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();
  const [listUsers, setListUsers] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [newUserEdit, setNewUserEdit] = useState({
    id: "",
    username: "",
    email: "",
    money: "",
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers(user.accessToken, dispatch).then((users) =>
      setListUsers(users)
    );
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

  const data = [];
  if (listUsers) {
    listUsers.forEach((user, index) => {
      data.push({
        key: index,
        money: user.money,
        name: user.username,
        id: user._id,
        email: user.email,
        admin: user.isAdmin ? "Admin" : "Thành viên",
        isEdit: false,
        description: (
          <Descriptions
            className="bg-red"
            bordered
            title="Chi tiết tài khoản"
            size={size}
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
              {/* {editUser ? (
                <TextArea placeholder={user.courses.length} allowClear />
              ) : user.courses.length < 1 ? (
                0
              ) : (
                user.courses.filter((course) => <span>course</span>)
              )} */}
              {user.courses.length}
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
                  deleteManyUser(currentUser.accessToken, selectedRows);
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
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
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
    });
    setSelectedRecord(expanded ? record : null);
  };
  const isRecordSelected = (record) => {
    return selectedRecord && selectedRecord.id === record.id;
  };
  const getRowClassName = (record, index) => {
    return isRecordSelected(record) ? "userAdmin__active" : "";
  };

  // Phần xử lí cập nhật chỉnh sử user
  const handleEditUser = () => {
    // cận thận vì khi nháy nút edit thì tất cả các thẻ sẽ chuyển sang chế độ isedit bằng true nên. có thể fix bằng cách chỉnh lại logic của onClick nút edit. Chúng ta sẽ ẩn hoặc mở nút Save của chính thẻ đó
    editUserRequest(currentUser.accessToken, newUserEdit);
    setUpdatedUser(newUserEdit);
  };
  //phần xử lí xóa user
  const handleDeleteUser = (id) => {
    deleteUser(currentUser.accessToken, id);
    setUpdatedUser(id);
  };
  const tableProps = {
    bordered,
    loading,
    size,
    expandable: {
      ...defaultExpandable,
      onExpand: handleExpand,
      expandRowByClick: false,
    },

    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection: {
      type: "checkbox",
      selectedRowKeys,
      onChange: setSelectedRowKeys,
    },
    rowClassName: getRowClassName,
    scroll,
    tableLayout,
  };
  return (
    <>
      <h1>USER</h1>
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
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
    </>
  );
};
export default MenuUser;
