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

  const onFinish = () => {
    setUserTest(false);
    dispatch(toastSuccess("Bạn đã hết thời gian test"));
  };
  const onChange = (val) => {
    if (typeof val === "number" && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log("changed!");
    }
  };
  return (
    <>
      {userTest && (
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
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
