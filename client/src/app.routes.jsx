import { createBrowserRouter } from "react-router"
import Landing from "./pages/landing"
import Login from "./pages/login"
import Register from "./pages/register"

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])
