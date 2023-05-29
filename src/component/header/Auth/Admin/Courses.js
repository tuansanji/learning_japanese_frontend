import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import { Form, Table, Button, Descriptions, Select } from "antd";
import { Input } from "antd";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  deleteCourse,
  deleteManyCourse,
  editCourseRequest,
  getAllCourses,
  postCourse,
} from "../../../../redux/apiRequest";
import { toastErr, toastSuccess } from "../../../../redux/slice/toastSlice";
import Loading from "../../../SupportTab/Loading";
import { createAxios } from "../../../../redux/createInstance";
import MockTest from "./MockTest";
import InputFc from "./InputFc";

const defaultExpandable = {
  expandedRowRender: (record) => <div>{record.description}</div>,
};
const { TextArea } = Input;

const defaultCourse = {
  name: "",
  lesson: "",
  stage: "",
  way: "",
  level: "",
  pathVideo: "",
  pdf: "",
  desc: "",
  audio: "",
  doc: "",
  author: "dũng mori",
};

// phần admin không tối ưu với useCallback, useMemo, memo

const MenuCourses = ({ currentUser }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const [mockTest, setMockTest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputSearch, setInputSearch] = useState("");
  const [searchSelector, setSearchSelector] = useState("name");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listCourses, setListCourses] = useState([]);
  const [moveCourse, setMoveCourse] = useState({
    courseId: "",
    nextCourseId: "",
  });
  const [msg, setMsg] = useState("");
  const [reRender, setRerender] = useState(null);
  const [overlayPost, setOverlayPost] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [postNewCourse, setPostNewCourse] = useState({
    name: "",
    lesson: "",
    stage: "",
    way: "",
    level: "",
    pathVideo: "",
    pdf: "",
    audio: "",
    desc: "",
    doc: "",
    author: "dũng mori",
  });
  const [editStates, setEditStates] = useState(Array(listCourses).fill(false));
  const [newCourseEdit, setNewCourseEdit] = useState({
    id: "",
    ...defaultCourse,
  });
  let axiosJWT = createAxios(currentUser, dispatch);

  // lấy all khóa học
  useEffect(() => {
    getAllCourses(currentUser.accessToken, axiosJWT)
      .then((courses) => {
        setListCourses(courses.sort((a, b) => a.order - b.order));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [reRender]);

  // dữ liệu bảng
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "order",
      dataIndex: "order",
    },
    {
      title: "Lesson",
      dataIndex: "lesson",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      sorter: (a, b) => a.stage.localeCompare(b.stage),
    },
    {
      title: "Way",
      dataIndex: "way",
      sorter: (a, b) => a.way.localeCompare(b.way),
    },
    {
      title: "Level",
      dataIndex: "level",
      filters: [
        {
          text: "N1",
          value: "n1",
        },
        {
          text: "N2",
          value: "n2",
        },
        {
          text: "N3",
          value: "n3",
        },
        {
          text: "N4",
          value: "n4",
        },
        {
          text: "N5",
          value: "n5",
        },
      ],
      onFilter: (value, record) => {
        const domain = record.level;

        return domain === `n${value[1]}`;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          className="flex items-center bg-red-500"
          type="primary"
          onClick={() => {
            if (window.confirm("Bạn có chắc chắn muốn xóa? ")) {
              deleteCourse(currentUser.accessToken, record.id, axiosJWT)
                .then((res) => {
                  dispatch(toastSuccess(res.data));
                  setRerender(record.id);
                })
                .catch((err) => {
                  dispatch(toastErr(err.response.data));
                });
            } else {
            }
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  //handle edit course
  const handleSaveCourse = () => {
    editCourseRequest(currentUser.accessToken, newCourseEdit, axiosJWT)
      .then((res) => {
        dispatch(toastSuccess(res.data));
        setRerender(newCourseEdit.id);
      })
      .catch((err) => {
        dispatch(toastErr(err.response.data));
      });
  };

  // phần filter kết hợp ô search
  const filteredData = listCourses.filter((item) => {
    return item[searchSelector]
      .toLowerCase()
      .includes(inputSearch.toLowerCase());
  });
  // dữ liệu khóa học cho bảng
  const data = [];
  if (filteredData) {
    filteredData.forEach((course, indexCourse) => {
      data.push({
        key: indexCourse,
        id: course._id,
        name: course.name,
        lesson: course.lesson,
        stage: course.stage,
        way: course.way,
        level: course.level,
        desc: course.desc,
        pdf: course.pdf,
        audio: course.audio,
        timeLine: course.timeLine,
        doc: course.doc,
        order: course.order,
        description: (
          <Descriptions
            className="bg-red"
            bordered
            title="Chi tiết bài học"
            size="large"
            extra={
              <div className="flex gap-[2rem]">
                <Button
                  className={`bg-blue-500 flex items-center ${
                    !editStates[indexCourse] && "hidden"
                  }`}
                  type="primary"
                  onClick={() => {
                    const index = indexCourse;
                    const newEditStates = [...editStates];
                    newEditStates[index] = false;
                    setEditStates(newEditStates);
                    handleSaveCourse();
                  }}
                >
                  Save
                </Button>
                <Button
                  className="flex items-center bg-green-500"
                  type="primary"
                  onClick={() => {
                    const index = indexCourse;
                    const newEditStates = [...editStates];
                    newEditStates[index] = !newEditStates[index];
                    setEditStates(newEditStates);
                    setNewCourseEdit({
                      ...newCourseEdit,
                      id: course._id,
                      name: course.name,
                      lesson: course.lesson,
                      stage: course.stage,
                      way: course.way,
                      level: course.level,
                      desc: course.desc,
                      pdf: course.pdf,
                      audio: course.audio,
                      doc: course.doc,
                      timeLine: course.timeLine,
                    });
                  }}
                >
                  {editStates[indexCourse] ? "Cancel" : "Edit"}
                </Button>
              </div>
            }
          >
            <Descriptions.Item label="Name">
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.name}
                  value={newCourseEdit.name}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      name: e.target.value,
                    });
                  }}
                />
              ) : (
                course.name
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Lesson">
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.lesson}
                  value={newCourseEdit.lesson}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      lesson: e.target.value,
                    });
                  }}
                />
              ) : (
                course.lesson
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Stage">
              {" "}
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.stage}
                  value={newCourseEdit.stage}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      stage: e.target.value,
                    });
                  }}
                />
              ) : (
                course.stage
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Way">
              {" "}
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.way}
                  value={newCourseEdit.way}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      way: e.target.value,
                    });
                  }}
                />
              ) : (
                course.way
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Level">
              {" "}
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.level}
                  value={newCourseEdit.level}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      level: e.target.value,
                    });
                  }}
                />
              ) : (
                course.level
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Id">{course._id}</Descriptions.Item>
            <Descriptions.Item label="PathVideo">
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.pathVideo}
                  value={newCourseEdit.pathVideo}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      pathVideo: e.target.value,
                    });
                  }}
                />
              ) : (
                course.pathVideo
              )}
            </Descriptions.Item>
            <Descriptions.Item label="PDF">
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.pdf}
                  value={newCourseEdit.pdf}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      pdf: e.target.value,
                    });
                  }}
                />
              ) : (
                course.pdf || "đang cập nhật..."
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Doc">
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.doc}
                  value={newCourseEdit.doc}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      doc: e.target.value,
                    });
                  }}
                />
              ) : (
                course.doc || "đang cập nhật..."
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Audio">
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.audio}
                  value={newCourseEdit.audio}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      audio: e.target.value,
                    });
                  }}
                />
              ) : (
                course.audio || "đang cập nhật..."
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Thông tin chi tiết">
              Thời gian đăng:
              {moment(course.createdAt).format("DD/MM/YYYY HH:mm")}
              <br />
              Sửa đổi gần nhất:
              {moment(course.updatedAt).format("DD/MM/YYYY HH:mm")}
              <br />
              timline:{course.timeLine || "đang cập nhật"}
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
    setNewCourseEdit({
      id: record.id,
      name: record.name,
      lesson: record.lesson,
      stage: record.stage,
      way: record.way,
      level: record.level,
      pathVideo: record.video,
      pdf: record.pdf,
      audio: record.audio,
      desc: record.desc,
      doc: record.doc,

      author: "dũng mori",
    });
    setSelectedRecord(expanded ? record : null);
  };
  // phần xác định nháy vào phần mở rộng nào
  const isRecordSelected = (record) => {
    return selectedRecord && selectedRecord.id === record.id;
  };
  // thêm class vào phần mở rộng để csss
  const getRowClassName = (record, index) => {
    return isRecordSelected(record) ? "userAdmin__active" : "";
  };

  const selectedRows = data
    .filter((record, index) => selectedRowKeys.includes(index))
    .map((record) => record.id);

  // footer của bảng dữ liệu
  const defaultFooter = () => {
    return (
      <div>
        <p>
          Tổng số bài học :{" "}
          <span style={{ color: "red", fontWeight: 600, fontSize: "1.8rem" }}>
            {listCourses.length}
          </span>
        </p>
        <p style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          Tổng số bài học đang được chọn :
          <span style={{ color: "red", fontWeight: 600, fontSize: "1.8rem" }}>
            {" "}
            {selectedRows.length}
          </span>
          {selectedRows.length > 0 && (
            <Button
              className="flex items-center bg-red-500"
              type="primary"
              onClick={() => {
                if (window.confirm(`Bạn có chắc chắn muốn xóa ?`)) {
                  deleteManyCourse(
                    currentUser.accessToken,
                    selectedRows,
                    axiosJWT
                  )
                    .then((res) => {
                      dispatch(toastSuccess(res.data));
                    })
                    .catch((err) => {
                      dispatch(toastErr(err.response.data));
                    });

                  setRerender(selectedRows);
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

  const tableProps = {
    footer: true ? defaultFooter : undefined,
    expandable: {
      ...defaultExpandable,
      onExpand: handleExpand,
      expandRowByClick: false,
    },
    rowSelection: {
      type: "checkbox",
      selectedRowKeys,
      onChange: setSelectedRowKeys,
    },
    rowClassName: getRowClassName,
  };
  //post course
  const handlePostCourse = () => {
    if (
      postNewCourse.name &&
      postNewCourse.lesson &&
      postNewCourse.stage &&
      postNewCourse.way &&
      postNewCourse.level
    ) {
      postCourse(currentUser.accessToken, postNewCourse, axiosJWT)
        .then((res) => {
          setMsg(res.data);
          dispatch(toastSuccess(res.data));
        })
        .catch((err) => {
          dispatch(toastSuccess(err.response.data));
          setMsg(err.response.data);
        });
    } else {
      setMsg("Vui lòng nhập đầy đủ thông tin");
    }
  };
  // phần xư lí di chuyển của course
  const handleMoveCourse = () => {
    if (moveCourse.courseId && moveCourse.nextCourseId) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/courses/move`, moveCourse, {
          headers: { token: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          dispatch(toastSuccess(res.data));
          setRerender(res.data);
        })
        .catch((err) => dispatch(toastErr(err.response.data)));
    } else {
      dispatch(toastErr("Vui lòng điền đầy đủ"));
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="my-[2rem]">
        <Form.Item label="Fields" className="w-[30rem]">
          <Select
            value={searchSelector}
            onChange={(value) => {
              setSearchSelector(value);
            }}
          >
            <Select.Option value="name">name</Select.Option>
            <Select.Option value="lesson">lesson</Select.Option>
            <Select.Option value="stage">stage</Select.Option>
            <Select.Option value="way">way</Select.Option>
            <Select.Option value="level">level</Select.Option>
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
        </div>{" "}
        <div className="flex h-[3rem] my-4 gap-5 items-center">
          <Button
            className="shadow-desc hover:bg-[#e13917] "
            onClick={() => {
              handleMoveCourse();
            }}
          >
            Di chuyển
          </Button>
          <label className="text-[red]">ID: </label>
          <InputFc
            course={moveCourse}
            type="number"
            field={"courseId"}
            handle={setMoveCourse}
            text={"id bài học"}
            className="border border-[#333] outline-none h-full w-[40rem]  rounded-xl px-3"
            search={true}
          />

          <label className="text-[red]">Order: </label>
          <InputFc
            type="number"
            course={moveCourse}
            field={"nextCourseId"}
            handle={setMoveCourse}
            text={" nextCourseId"}
            className="border border-[#333] outline-none h-full w-[40rem]  rounded-xl px-3"
            search={true}
          />
        </div>
      </div>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity ease-out duration-300 pointer-events-none  ${
          overlayPost ? "opacity-1 z-[1111]" : "opacity-0 z-[-9999]"
        }`}
        id="overlay"
      >
        <div className="flex bg-white rounded-xl overflow-hidden shadow-sm pointer-events-auto  w-[70%] h-[90%] absolute">
          <CloseIcon
            onClick={() => {
              setOverlayPost(false);
            }}
            className="absolute right-0 top-[0] hover:bg-neutral-400 cursor-pointer"
            style={{ fontSize: "4rem" }}
          />

          <div className=" flex flex-col gap-7 px-[4rem] py-[2rem] w-full h-full">
            <InputFc
              course={postNewCourse}
              field={"name"}
              handle={setPostNewCourse}
              text={"tên bài học..."}
            />
            <InputFc
              course={postNewCourse}
              field={"lesson"}
              handle={setPostNewCourse}
              text={"bài học..."}
            />
            <InputFc
              course={postNewCourse}
              field={"stage"}
              handle={setPostNewCourse}
              text={"giai đoạn..."}
            />
            <InputFc
              course={postNewCourse}
              field={"way"}
              handle={setPostNewCourse}
              text={"chặg..."}
            />
            <InputFc
              course={postNewCourse}
              field={"level"}
              handle={setPostNewCourse}
              text={"trình độ..."}
            />
            <InputFc
              course={postNewCourse}
              field={"pathVideo"}
              handle={setPostNewCourse}
              text={"link video..."}
            />
            <InputFc
              course={postNewCourse}
              field={"pdf"}
              handle={setPostNewCourse}
              text={"link pdf..."}
            />
            <InputFc
              course={postNewCourse}
              field={"audio"}
              handle={setPostNewCourse}
              text={"audio..."}
            />
            <InputFc
              course={postNewCourse}
              field={"doc"}
              handle={setPostNewCourse}
              text={"link doc - html..."}
            />
          </div>
          <div className="w-[500px] bg-slate-50 flex flex-col p-[2rem] ">
            <div
              className="flex items-center justify-around  w-full border-b-2  pb-[3rem]"
              aria-label="button-combination"
            >
              <button
                className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 hover:opacity-60 rounded-lg h-[60px]"
                onClick={() => {
                  handlePostCourse();
                  setRerender(postNewCourse.name);
                }}
              >
                POST
              </button>
              <button
                className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-blue-500 border border-blue-500 hover:bg-gray-300 rounded-lg h-[60px]"
                onClick={() => {
                  setPostNewCourse(defaultCourse);
                }}
              >
                RESET
              </button>
            </div>
            <div className="h-[10rem] border-b-2 text-[red] text-[1.6rem] font-bold pt-5">
              <span>Thông báo:</span> <p className="text-[blue] mt-3">{msg}</p>
            </div>
            <div className="p-4 mt-10 shadow-desc">
              <span className="text-[#222222]">
                » Hiện tại là chỉ đăng theo kiểu đại trà nên chưa xử lí tự động
                đóng hay là một option tùy chọn riêng
              </span>
              <br />
              <span className="text-[#222222]">
                » link audio hay description sẽ được cập nhật sau
              </span>
              <br />
              <span className="text-[#222222]">
                » Cố gắng cập nhật một lần cho đầy đủ luôn
              </span>
            </div>
          </div>
        </div>
      </div>
      <MockTest mockTest={mockTest} setMockTest={setMockTest} />
      <Button
        className="shadow-desc hover:bg-[#d9a1d5] "
        onClick={() => {
          setOverlayPost(true);
        }}
      >
        Thêm khóa học
      </Button>

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
        dataSource={true ? data : []}
      />
    </>
  );
};
export default memo(MenuCourses);
