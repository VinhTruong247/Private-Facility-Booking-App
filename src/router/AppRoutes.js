import Home from "../components/home/Home";
import Layout from "../layout/Layout";
import LoginPage from "../components/auth/LoginPage";
import SignUpPage from "../components/auth/SignUpPage";
import DashboardPage from "../components/Manage/Dashboard/DashboardPage";
import Manage from "../components/Manage/Manage";

const AppRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
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
        element: <Manage/>,
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
        ],
      },
];

export default AppRoutes;
