import Home from "../components/home/Home";
import Layout from "../layout/Layout";
import LoginPage from "../components/auth/LoginPage";
import SignUpPage from "../components/auth/SignUpPage";
import DashboardPage from "../components/Manage/Dashboard/DashboardPage";
import Manage from "../components/Manage/Manage";
import BookingPage from "../components/booking/BookingPage";
import SearchCourseResult from "../components/search/searchCourseResult";

const AppRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "facility",
        element: <BookingPage />,
      },
      {
        path: "search-court",
        element: <SearchCourseResult />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <SignUpPage />,
  },
  {
    path: "manage",
    element: <Manage />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
    ],
  },
];

export default AppRoutes;
