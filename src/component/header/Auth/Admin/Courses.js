import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import {
  Form,
  Space,
  Table,
  Button,
  Descriptions,
  message,
  Popconfirm,
  Select,
} from "antd";
import { Input } from "antd";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  deleteManyCourse,
  editCourseRequest,
  getAllCourses,
  postCourse,
} from "../../../../redux/apiRequest";
import {
  success,
  toastErr,
  toastSuccess,
} from "../../../../redux/slice/toastSlice";
import Loading from "../../../SupportTab/Loading";
const defaultExpandable = {
  expandedRowRender: (record) => <div>{record.description}</div>,
};
const { TextArea } = Input;

const MenuCourses = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [inputSearch, setInputSearch] = useState("");
  const [searchSelector, setSearchSelector] = useState("name");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editCourse, setEditCourse] = useState(false);
  const [listCourses, setListCourses] = useState([]);
  const [ellipsis, setEllipsis] = useState(false);
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
    author: "dũng mori",
  });
  const [editStates, setEditStates] = useState(Array(listCourses).fill(false));
  const [newCourseEdit, setNewCourseEdit] = useState({
    id: "",
    name: "",
    lesson: "",
    stage: "",
    way: "",
    level: "",
    pathVideo: "",
    pdf: "",
    desc: "",
    audio: "",
    author: "dũng mori",
  });
  useEffect(() => {
    getAllCourses(currentUser.accessToken)
      .then((courses) => {
        setListCourses(courses);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [reRender]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
        if (value === "n1") {
          return domain === "n1";
        } else if (value === "n2") {
          return domain === "n2";
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
            if (window.confirm("Bạn có chắc chắn muốn xóa? ")) {
              deleteCourse(currentUser.accessToken, record.id)
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
    editCourseRequest(currentUser.accessToken, newCourseEdit)
      .then((res) => {
        dispatch(toastSuccess(res.data));
        setRerender(newCourseEdit.id);
        setEditCourse(false);
      })
      .catch((err) => {
        dispatch(toastErr(err.response.data));
      });
  };

  const filteredData = listCourses.filter((item) => {
    return item[searchSelector]
      .toLowerCase()
      .includes(inputSearch.toLowerCase());
  });

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
                  className="bg-green-500 flex items-center"
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
                      timeLine: course.timeLine,
                    });

                    // setEditCourse(!editCourse);
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
            {/* <Descriptions.Item label="desc">
              {editStates[indexCourse] ? (
                <TextArea
                  placeholder={course.desc || "cập nhật"}
                  value={newCourseEdit.desc}
                  allowClear
                  onChange={(e) => {
                    setNewCourseEdit({
                      ...newCourseEdit,
                      desc: e.target.value,
                    });
                  }}
                />
              ) : (
                course.desc || "đang cập nhật..."
              )}
            </Descriptions.Item>{" "} */}
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
    ellipsis,
  }));

  // Phần xử lí khi người dùng nháy vào phần mở rộng
  const handleExpand = (expanded, record) => {
    // "expanded" (boolean) và "record" (đối tượng dữ liệu của hàng được mở rộng)
    console.log(record.id);
    setEditCourse(false);
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
      author: "dũng mori",
    });
    setSelectedRecord(expanded ? record : null);
  };
  const isRecordSelected = (record) => {
    return selectedRecord && selectedRecord.id === record.id;
  };
  const getRowClassName = (record, index) => {
    return isRecordSelected(record) ? "userAdmin__active" : "";
  };

  const selectedRows = data
    .filter((record, index) => selectedRowKeys.includes(index))
    .map((record) => record.id);

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
              className="bg-red-500 flex items-center"
              type="primary"
              onClick={() => {
                if (window.confirm(`Bạn có chắc chắn muốn xóa ?`)) {
                  deleteManyCourse(currentUser.accessToken, selectedRows)
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
  const handlePostCourse = () => {
    if (
      postNewCourse.name !== "" &&
      postNewCourse.lesson !== "" &&
      postNewCourse.stage !== "" &&
      postNewCourse.way !== "" &&
      postNewCourse.level !== ""
    ) {
      postCourse(currentUser.accessToken, postNewCourse)
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

  return (
    <>
      {isLoading && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
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
        </div>
      </div>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity ease-out duration-300 pointer-events-none  ${
          overlayPost ? "opacity-1 z-[99999]" : "opacity-0 z-[-99999]"
        }`}
        id="overlay"
      >
        <div className="flex bg-white rounded-xl overflow-hidden shadow-sm pointer-events-auto  w-[70%] h-[60%] absolute">
          <CloseIcon
            onClick={() => {
              setOverlayPost(false);
            }}
            className="absolute right-0 top-[0] hover:bg-neutral-400 cursor-pointer"
            style={{ fontSize: "4rem" }}
          />

          <div className=" flex flex-col gap-7 px-[4rem] py-[2rem] w-full h-full">
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="name"
              >
                Name :
              </label>
              <input
                value={postNewCourse.name}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    name: e.target.value,
                  });
                }}
                id="name"
                type="text"
                placeholder="Điền tên bài học..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="lesson"
              >
                Lesson :
              </label>
              <input
                value={postNewCourse.lesson}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    lesson: e.target.value,
                  });
                }}
                id="lesson"
                type="text"
                placeholder="Điền bài học...."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>{" "}
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="stage"
              >
                Stage :
              </label>
              <input
                value={postNewCourse.stage}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    stage: e.target.value,
                  });
                }}
                id="stage"
                type="text"
                placeholder="Điền tiến trình...."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>{" "}
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="way"
              >
                Way :
              </label>
              <input
                value={postNewCourse.way}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    way: e.target.value,
                  });
                }}
                id="way"
                type="text"
                placeholder="Điền chặng đường..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>{" "}
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="level"
              >
                Level :
              </label>
              <input
                value={postNewCourse.level}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    level: e.target.value,
                  });
                }}
                id="level"
                type="text"
                placeholder="Điền trình độ..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="pathVideo"
              >
                PathVideo :
              </label>
              <input
                value={postNewCourse.pathVideo}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    pathVideo: e.target.value,
                  });
                }}
                id="pathVideo"
                type="text"
                placeholder="Điền trình độ..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>{" "}
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="pdf"
              >
                Pdf :
              </label>
              <input
                value={postNewCourse.pdf}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    pdf: e.target.value,
                  });
                }}
                id="pdf"
                type="text"
                placeholder="Điền trình độ..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
            <div className=" flex gap-5 items-center w-full">
              <label
                className="w-[10rem] border-b-4 font-bold border-[red] px-2 py-2"
                htmlFor="pdf"
              >
                Audio :
              </label>
              <input
                value={postNewCourse.audio}
                onChange={(e) => {
                  setPostNewCourse({
                    ...postNewCourse,
                    audio: e.target.value,
                  });
                }}
                id="audio"
                type="text"
                placeholder="Điền link mp3..."
                className=" w-[80%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
              />
            </div>
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
                  setPostNewCourse({
                    name: "",
                    lesson: "",
                    stage: "",
                    way: "",
                    level: "",
                    pathVideo: "",
                    pdf: "",
                    desc: "",
                    author: "dũng mori",
                  });
                }}
              >
                RESET
              </button>
            </div>
            <div className="h-[10rem] border-b-2 text-[red] text-[1.6rem] font-bold pt-5">
              <span>Thông báo:</span> <p className="text-[blue] mt-3">{msg}</p>
            </div>
            <div className=" mt-10 shadow-desc p-4">
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
export default MenuCourses;
