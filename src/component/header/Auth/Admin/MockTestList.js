import moment from "moment";

import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Form, Table, Button, Descriptions, message, Popconfirm } from "antd";
import { Input } from "antd";

import Loading from "../../../SupportTab/Loading";
import { toastErr, toastSuccess } from "../../../../redux/slice/toastSlice";
import MockTest from "./MockTest";

const defaultExpandable = {
  expandedRowRender: (record) => <div>{record.description}</div>,
};
const { TextArea } = Input;

// phần admin không tối ưu với useCallback, useMemo, memo

const MockTestList = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const [listMockTest, setListMockTest] = useState([]);
  const [editMockTest, setEditMockTest] = useState(false);
  const [mockTestNew, setMockTestNew] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mockTest, setMockTest] = useState(false);

  const [count, setCount] = useState(1);
  const increaseCount = () => {
    setCount((prev) => (prev += 1));
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/mockTest/lesson`)
      .then((res) => {
        setListMockTest(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [count]);
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
      title: "level",
      dataIndex: "level",
      sorter: (a, b) => a.level.localeCompare(b.level),
    },
    {
      title: "question",
      dataIndex: "question",
      sorter: (a, b) => a.question.localeCompare(b.question),
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
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/mockTest/edit`, mockTestNew, {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setEditMockTest(false);
        increaseCount();
        message.info("Sửa thành công");
      })
      .catch((err) => {
        dispatch(toastErr(err?.response.data));
      });
  };
  //phần xử lí xóa bài thi
  const handleDeleteUser = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/mockTest/delete`,
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
        increaseCount();
        dispatch(toastSuccess(res.data));
      })
      .catch((err) => {
        dispatch(toastErr(err?.response.data));
      });
  };
  const data = [];
  if (listMockTest) {
    listMockTest.forEach((mockTest, index) => {
      data.push({
        key: mockTest._id,
        name: mockTest.name,
        level: mockTest.level,
        id: mockTest._id,
        time: mockTest.time,
        audio: mockTest.audio,
        html: mockTest.html,
        question: mockTest.question,
        title: mockTest.title,
        lesson: mockTest.lesson,
        isEdit: false,
        description: (
          <Descriptions
            className="bg-red"
            bordered
            title="Chi tiết tài khoản"
            size="large"
            extra={
              <div className="flex gap-[2rem]">
                {editMockTest && (
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

                    setEditMockTest(!editMockTest);
                  }}
                >
                  {editMockTest ? "Cancel" : "Edit"}
                </Button>
              </div>
            }
          >
            <Descriptions.Item label="ID">{mockTest._id}</Descriptions.Item>
            <Descriptions.Item label="Tên">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.name}
                  value={mockTestNew.name}
                  allowClear
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      name: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.name
              )}
            </Descriptions.Item>
            <Descriptions.Item label="time">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.time}
                  value={mockTestNew.time}
                  allowClear
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      time: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.time
              )}
            </Descriptions.Item>
            <Descriptions.Item label="question">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.question}
                  allowClear
                  value={mockTestNew.question}
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      question: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.question
              )}
            </Descriptions.Item>
            <Descriptions.Item label="level">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.level}
                  allowClear
                  value={mockTestNew.level}
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      level: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.level
              )}
            </Descriptions.Item>

            <Descriptions.Item label="title">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.title}
                  allowClear
                  value={mockTestNew.title}
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      title: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.title
              )}
            </Descriptions.Item>
            <Descriptions.Item label="audio">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.audio}
                  allowClear
                  value={mockTestNew.audio}
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      audio: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.audio
              )}
            </Descriptions.Item>
            <Descriptions.Item label="html">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.html}
                  allowClear
                  value={mockTestNew.html}
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      html: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.html
              )}
            </Descriptions.Item>
            <Descriptions.Item label="lesson">
              {editMockTest ? (
                <TextArea
                  placeholder={mockTest.lesson}
                  allowClear
                  value={mockTestNew.lesson}
                  onChange={(e) => {
                    setMockTestNew({
                      ...mockTestNew,
                      lesson: e.target.value,
                    });
                  }}
                />
              ) : (
                mockTest.lesson
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Thông tin chi tiết">
              Thời gian tạo nick:{" "}
              {moment(mockTest.createdAt).format("DD/MM/YYYY HH:mm")}
              <br />
              Sửa đổi gần nhất:{" "}
              {moment(mockTest.updatedAt).format("DD/MM/YYYY HH:mm")}
              <br />
            </Descriptions.Item>
          </Descriptions>
        ),
      });
    });
  }

  const tableColumns = columns.map((item) => ({
    ...item,
  }));

  // Phần xử lí khi người dùng nháy vào phần mở rộng
  const handleExpand = (expanded, record) => {
    // "expanded" (boolean) và "record" (đối tượng dữ liệu của hàng được mở rộng)

    setEditMockTest(false);
    setMockTestNew({
      id: record.id,
      name: record.name,
      level: record.level,
      time: record.time,
      audio: record.audio,
      html: record.html,
      question: record.question,
      title: record.title,
      lesson: record.lesson,
    });
    setSelectedRecord(expanded ? record : null);
  };
  const isRecordSelected = (record) => {
    return selectedRecord && selectedRecord.id === record.id;
  };
  const getRowClassName = (record, index) => {
    return isRecordSelected(record) ? "userAdmin__active" : "";
  };

  const tableProps = {
    expandable: {
      ...defaultExpandable,
      onExpand: handleExpand,
      expandRowByClick: false,
    },

    rowSelection: {
      type: "checkbox",
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

      <div className="my-8">
        <Button
          className="shadow-desc hover:bg-[#d9a1d5] ml-10 "
          onClick={() => {
            setMockTest(true);
          }}
        >
          Thêm bài thi
        </Button>
      </div>
      <MockTest
        mockTest={mockTest}
        setMockTest={setMockTest}
        increaseCount={increaseCount}
      />

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
export default memo(MockTestList);
