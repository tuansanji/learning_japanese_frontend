import { Routes, Route } from "react-router-dom";

import HomePage from "../../pages/homePage/HomePage";
import LevelPage from "../../pages/coursePage/LevelPage";
import Login from "../header/Auth/Login";
import Register from "../header/Auth/Register";
import UserInfor from "../header/Auth/ProfileUser";
import WayPage from "../../pages/coursePage/WayPage";
import GuidePage from "../../pages/guidePage/GuidePage";

import CoursePage from "../../pages/coursePage/CoursePage";
import GuidePages from "../../pages/guidePage/GuidePages";

import NavigationIcon from "@material-ui/icons/Navigation";

function Container() {
  return (
    <div className="container_main">
      <Routes>
        <Route
          path="https://janpanese-fontend.onrender.com"
          element={<HomePage />}
        />
        <Route
          path="https://janpanese-fontend.onrender.com/guide"
          element={<GuidePages />}
        />
        <Route
          path="https://janpanese-fontend.onrender.com/guide/:question"
          element={<GuidePage />}
        />
        <Route
          path={`https://janpanese-fontend.onrender.com/courses`}
          element={<CoursePage />}
        />
        <Route
          path={`https://janpanese-fontend.onrender.com/courses/:level`}
          element={<LevelPage />}
        />
        <Route
          path={`https://janpanese-fontend.onrender.com/courses/:level/:way`}
          element={<WayPage />}
        />
        {/* <Route path={`/courses/:level/:way/:stage`} element={<StagePage />} />
        <Route
          path={`/courses/:level/:way/:stage/:lesson`}
          element={<LessonPages />}
        />
        <Route
          path={`/courses/:level/:way/:stage/:lesson/:name`}
          element={<ViewlearnPage />} */}
        {/* /> */}
        <Route
          path="https://janpanese-fontend.onrender.com/auth/login"
          element={<Login />}
        ></Route>
        <Route
          path="https://janpanese-fontend.onrender.com/auth/register"
          element={<Register />}
        ></Route>
        <Route
          path="https://janpanese-fontend.onrender.com/user/infor"
          element={<UserInfor />}
        ></Route>
      </Routes>

      <button
        className="fixed bottom-[6rem] right-10 border rounded-[50%] z-[9000] "
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
