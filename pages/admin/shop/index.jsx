import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div className="shop">
      <div className="iconBox">
        <Link href="shop/products">
          <img src="/icons/add.png" alt="" />
        </Link>
        <span>product management</span>
      </div>
      <Link href="shop/categories">
        <div className="iconBox">
          <img src="/icons/category.png" alt="" />
          <span>category management</span>
        </div>
      </Link>
      <style jsx>{`
        .shop {
          width: 100vw;
          height: var(--min-height);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        }
        .iconBox {
          height: 20vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          font-size: 1.2rem;
        }
        .iconBox img {
          width: 15vw;
          transition: all 0.3s linear;
          cursor: pointer;
        }
        .iconBox img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
