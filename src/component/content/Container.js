import { Routes, Route } from "react-router-dom";

import HomePage from "../../pages/homePage/HomePage";
import ViewlearnPage from "../../pages/viewLearnPage/ViewlearnPage";
import LevelPage from "../../pages/coursePage/LevelPage";
import StagePage from "../../pages/coursePage/StagePage";
import Login from "../header/Auth/Login";
import Register from "../header/Auth/Register";
import UserInfor from "../header/Auth/ProfileUser";
import WayPage from "../../pages/coursePage/WayPage";
import GuidePage from "../../pages/guidePage/GuidePage";
import LessonPages from "../../pages/coursePage/LessonPage";
import CoursePage from "../../pages/coursePage/CoursePage";
import GuidePages from "../../pages/guidePage/GuidePages";

import NavigationIcon from "@material-ui/icons/Navigation";
import { yellow } from "@material-ui/core/colors";

function Container() {
  return (
    <div className="container_main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guide" element={<GuidePages />} />
        <Route path="/guide/:question" element={<GuidePage />} />
        <Route path={`/courses`} element={<CoursePage />} />
        <Route path={`/courses/:level`} element={<LevelPage />} />
        <Route path={`/courses/:level/:way`} element={<WayPage />} />
        <Route path={`/courses/:level/:way/:stage`} element={<StagePage />} />
        <Route
          path={`/courses/:level/:way/:stage/:lesson`}
          element={<LessonPages />}
        />
        <Route
          path={`/courses/:level/:way/:stage/:lesson/:name`}
          element={<ViewlearnPage />}
        />
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/user/infor" element={<UserInfor />}></Route>
      </Routes>

      <button
        className="fixed bottom-10 right-10 border rounded-[50%] z-[9000] "
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: `smooth`,
          });
        }}
      >
        <NavigationIcon style={{ fontSize: "40px", color: "yellow" }} />
      </button>
    </div>
  );
}

export default Container;
