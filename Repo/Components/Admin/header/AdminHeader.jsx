import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminHeader() {
  const router = useRouter();
  return (
    <div className="adminHeader">
      <div className="logo">
        <Link href="/admin">J Commerce</Link>
      </div>
      <div className="links">
        <div
          className={router.pathname === "/admin/shop" ? "link active" : "link"}
        >
          <Link href="/admin/shop">shop</Link>
        </div>

        <div
          className={
            router.pathname === "/admin/settings" ? "link active" : "link"
          }
        >
          <Link href="/admin/settings">settings</Link>
        </div>
      </div>

      <style jsx>{`
        .adminHeader {
          width: 100%;
          height: 5vh;
          padding: 0 3rem;
          background-color: rgb(0, 94, 255);
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.3rem;
        }
        .logo {
          width: 28%;
        }
        .links {
          min-width: 15%;
          display: flex;
          flex-direction: row-reverse;
          align-content: center;
          justify-content: space-between;
        }
        .link {
        }
        .active {
          color: rgb(255, 255, 255);
        }
      `}</style>
    </div>
  );
}
