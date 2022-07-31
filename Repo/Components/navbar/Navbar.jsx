import Link from "next/link";
import React, { useContext } from "react";
import { root } from "../../Context/Global/API";

export default function Navbar() {
  const { User, Orders, IsLoggedIn, UserIsCompleted } = useContext(root);

  return (
    <div className="Navbar">
      <span>بارکد</span>
      <div className="search">
        <input type="text" />
        <span>جستوجو</span>
      </div>
      <div className="auth">
        {IsLoggedIn && UserIsCompleted ? <Link href="/account">{User.LastName}</Link> : IsLoggedIn && !UserIsCompleted ? <Link href="/account">تکمیل حساب</Link> : <Link href="/auth">ورود</Link>}
      </div>
      <style jsx>{`
        .Navbar {
          height: 5vh;
          margin-top: 1vh;
          width: 100%;
          padding: 0 1vw;
          background-color: rgba(255, 255, 255, 0.7);
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
          border-radius: 500rem;
        }
        .search {
          width: 50%;
          height: 65%;
          border-radius: 5000rem;
          border: 1px solid rgba(167, 167, 167, 0.3);
          background-color: rgba(255, 255, 255, 1);
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-evenly;
          padding: 2px;
        }
        .search span {
          width: 19%;
          height: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--blue);
          color: white;
          border-radius: 5000rem;
          cursor: pointer;
          opacity: 0.8;
          transition: all 0.2s linear;
        }
        .search span:hover {
          opacity: 1;
        }
        .search input {
          width: 80%;
          height: 90%;
          border: none;
          outline: none;
          background-color: transparent;
          padding-right: 0.4vw;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
