import Home from "../components/home/Home";
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
  }
];

export default AppRoutes;
