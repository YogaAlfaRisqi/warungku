import { createBrowserRouter } from "react-router";
import GuestLayout from "./layouts/GuestLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./features/dashboard/pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    component: <GuestLayout />,
    children: [
      {
        index: true,
        path: "Login",
        element: <LoginPage />,
      },
      {
        path: "Register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    component: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
