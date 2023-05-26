import {
  HomePage,
  LevelPage,
  UserInfor,
  WayPage,
  GuidePage,
  BuyCourse,
  CoursePage,
  GuidePages,
  MyCourse,
  NotFoundPage,
  MockTest,
  LessonTest,
  PagesMockTest,
  BlogsPage,
  Blog,
} from "../pages";

import {
  ADMIN,
  Login,
  Register,
  ResetPassword,
  ForgotPassword,
} from "../component/header";
import MoviePage from "../pages/movePage/MoviePage";
import VideoView from "../pages/movePage/MovieView";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/guide", element: <GuidePages /> },
  { path: "/guide/:question", element: <GuidePage /> },
  { path: "/courses", element: <CoursePage /> },
  { path: "/courses/mockTest", element: <MockTest /> },
  { path: "/courses/mockTest/:level/:lesson", element: <LessonTest /> },
  { path: "/courses/mockTest/:level/:lesson/:id", element: <PagesMockTest /> },
  { path: "/courses/:level", element: <LevelPage /> },
  { path: "/courses/:level/:way", element: <WayPage /> },
  { path: "/courses/buy/:level", element: <BuyCourse /> },
  { path: "/me/courses", element: <MyCourse /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/blogs", element: <BlogsPage /> },
  { path: "/blogs/:id", element: <Blog /> },
  { path: "/movies", element: <MoviePage /> },
  { path: "/movies/:video", element: <VideoView /> },
  { path: "/user/infor", element: <UserInfor /> },
  { path: "/auth/admin", element: <ADMIN /> },
  { path: "/user/change-password/:token", element: <ResetPassword /> },
  { path: "/user/forgot-password", element: <ForgotPassword /> },
  { path: "*", element: <NotFoundPage /> },
];
