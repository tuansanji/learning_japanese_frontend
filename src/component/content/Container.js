import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "../../pages/homePage/HomePage";
import CoursePage from "../../pages/coursePage/CoursePage";
import ViewlearnPage from "../../pages/viewLearnPage/ViewlearnPage";
import CourseStatePage from "../../pages/coursePage/CourseStatePage";
import StatePage from "../../pages/coursePage/StatePage";
import Login from "../header/Auth/Login";
import Register from "../header/Auth/Register";
import UserInfor from "../header/Auth/ProfileUser";
import { useEffect } from "react";

function Container({ level = "n1" }) {
  // const user = useSelector((state) => {
  //   return state.auth.login.currentUser;
  // });

  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(user);
  //   if (!user) {
  //     navigate("/auth/login");
  //   }
  // }, []);
  return (
    <div className="container_main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path={`/course/${level}`} element={<CourseStatePage />} />
        <Route
          path={`/course/${level}/state-1/lesson-1`}
          element={<StatePage />}
        />
        <Route
          path={`/course/${level}/state-1/lesson-1/v1`}
          element={<ViewlearnPage />}
        />
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/user/infor" element={<UserInfor />}></Route>
      </Routes>
    </div>
  );
}

export default Container;
