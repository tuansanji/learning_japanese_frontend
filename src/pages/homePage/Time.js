import { Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastSuccess } from "../../redux/slice/toastSlice";
const { Countdown } = Statistic;

const Time = () => {
  const [time, setTime] = useState(0);
  const [userTest, setUserTest] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });

  // phần thời gian test của ng dùng
  useEffect(() => {
    if (!user) {
      if (localStorage.getItem("userTest")) {
        if (JSON.parse(localStorage.getItem("userTest")).status) {
          const timeUser = JSON.parse(localStorage.getItem("userTest")).time;
          setTime(timeUser - Date.now());
        } else {
          setUserTest(false);
        }
      }
    } else {
      if (user.courses.length > 0) {
        setUserTest(false);
      } else {
        if (localStorage.getItem("userTest")) {
          if (JSON.parse(localStorage.getItem("userTest")).status) {
            const timeUser = JSON.parse(localStorage.getItem("userTest")).time;
            setTime(timeUser - Date.now());
          } else {
            setUserTest(false);
          }
        }
      }
    }
  }, []);

  // hàm khi ng dùng hết thời gian
  const onFinish = () => {
    setUserTest(false);
    dispatch(toastSuccess("Bạn đã hết thời gian test"));
  };

  return (
    <>
      {userTest && (
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 z-50">
          <p className="font-semibold">Thời gian còn lại:</p>
          <Row gutter={16}>
            <Col span={12}>
              <Countdown
                title=""
                valueStyle={{ color: "red" }}
                value={Date.now() + time}
                onFinish={onFinish}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default Time;
