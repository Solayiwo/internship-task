import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import {
  Login,
  SignUp,
  HomeLayout,
  DashBoardLayout,
  DashboardHome,
  Transactions,
  Settings,
} from "./pages";
import ProtectedRoute from "@components/protected-route/ProtectedRoute";

import "@styles/App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/auth/login" replace />,
        },

        {
          path: "auth/login",
          element: <Login />,
        },

        {
          path: "auth/signup",
          element: <SignUp />,
        },
      ],
    },

   {
    element: <ProtectedRoute />, // wrap protected routes
    children: [
      {
        path: "/dashboard",
        element: <DashBoardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "/dashboard/transactions", element: <Transactions /> },
          { path: "/dashboard/settings", element: <Settings /> },
        ]
      },
    ],
  },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
