import React from "react";
import AdminHeader from "./header/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
