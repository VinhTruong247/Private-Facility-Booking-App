import Home from "../components/home/Home";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import Layout from "../layout/Layout";

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
    path: "Login",
    element: <Login />,
  },
  {
    path: "SignIn",
    element: <SignIn />,
  },
];

export default AppRoutes;
