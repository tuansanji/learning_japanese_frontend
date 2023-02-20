import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "../../pages/homePage/HomePage";
import ViewlearnPage from "../../pages/viewLearnPage/ViewlearnPage";
import LevelPage from "../../pages/coursePage/LevelPage";
import StagePage from "../../pages/coursePage/StagePage";
import Login from "../header/Auth/Login";
import Register from "../header/Auth/Register";
import UserInfor from "../header/Auth/ProfileUser";
import WayPage from "../../pages/coursePage/WayPage";
import StateItem from "../../pages/coursePage/NameItem";
import LessonPage from "../../pages/coursePage/LessonPage";
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
        <Route path={`/courses/:level`} element={<LevelPage />} />
        <Route
          path={`/courses/:level/:way`}
          element={<WayPage level={level} />}
        />
        <Route path={`/courses/:level/:way/:stage`} element={<StagePage />} />
        <Route
          path={`/courses/:level/:way/:stage/:lesson`}
          element={<LessonPage />}
        />
        <Route
          path={`/courses/:level/:way/:stage/:lesson/:name`}
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
