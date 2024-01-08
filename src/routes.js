import Home from "./pages/home";
import { authUsers } from "./utils";

export const privateRoutes = [
  {
    path: "/welcome",
    element: <Home />,
    permission: [authUsers[0], authUsers[1], authUsers[2]],
  },
];

export const publicRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
];
