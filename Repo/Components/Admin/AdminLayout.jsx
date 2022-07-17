import React from "react";
import AdminHeader from "./header/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className="AdminLayout gradient start-color end-color gradient--7">
      <AdminHeader />
      {children}
      <style jsx>{`
        .AdminLayout {
          min-height: 100vh;
        }

        .gradient {
          background: linear-gradient(33deg, #d279ee, #f8c390);
        }
      `}</style>
    </div>
  );
}
