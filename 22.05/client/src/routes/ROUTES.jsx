import Add from "../pages/Add";
import Basket from "../pages/Basket";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import MainRoot from "../pages/MainRoot";

export const ROUTES = [
  {
    path: "/",
    element: <MainRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add",
        element: <Add />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "detail/:id",
        element: <Detail/>,
      },
    ],
  },
];
