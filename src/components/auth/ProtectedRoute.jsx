import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute — only renders children if the admin session exists in localStorage.
 * Otherwise redirects to /admin/login.
 */
export default function ProtectedRoute({ children }) {
  const session = localStorage.getItem("maycon_admin_session");
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
