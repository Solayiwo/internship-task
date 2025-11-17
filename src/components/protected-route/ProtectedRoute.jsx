import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if a user is logged in
  const user = localStorage.getItem("koinsave_loggedInUser");

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/auth/login" replace />;
  }

  // Logged in → render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
