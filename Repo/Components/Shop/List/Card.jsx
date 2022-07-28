import gsap, { Linear } from "gsap";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Card({ e, id }) {
  const [T1, setT1] = useState(gsap.timeline({ paused: true }));

  useEffect(() => {
    T1.to(`.image_${id}`, { duration: 3, bottom: 0, ease: Linear.easeNone });
  }, []);

  const down = () => {
    T1.timeScale(1).play();
  };
  const up = () => {
    T1.timeScale(T1.duration() - 1).reverse();
  };

  return (
    <div className="Glass card">
      <div className="imageBox">
        <img className={`image image_${id}`} onMouseEnter={down} onMouseLeave={up} src={e.Image.split("/public")[1]} alt="" />
      </div>

      <div className="DetailBox">
        <div className="InfoBox">
          <h4 className="Category">{e.Category.Name}</h4>
          <h2 className="Name">{e.Name}</h2>
          <p className="Description">{e.Description}</p>
        </div>

        <div className="PriceBox">
          <div>
            <h3>هزینه با ما</h3>
            <h3 className="PriceWithUs">{parseInt(e.PriceWithUs).toLocaleString("fa-IR")}</h3>
          </div>
          <div className="cross">
            <h3>هزینه</h3>
            <h3 className="Price">{parseInt(e.Price).toLocaleString("fa-IR")}</h3>
          </div>
        </div>
      </div>
      <Link href={`/shop/product/${e.Name}`}>
        <div className="BTN">
          <span>مشاهده توضیحات</span>
        </div>
      </Link>
      <style jsx>{`
        .card {
          width: 20%;
          margin: 0 1vw;
          margin-bottom: 4vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.7);
          padding-bottom: 1rem;
        }
        .imageBox {
          position: relative;
          width: 100%;
          height: 25vh;
          overflow: hidden;
        }
        .image {
          position: absolute;
          left: 0;
          width: 100%;
        }

        .DetailBox {
          width: 90%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .Category {
          font-size: 0.8rem;
          color: var(--blue);
          margin-bottom: -10%;
        }
        .Name {
          font-size: 1.5rem;

          //it will cut the text more than 1 line with ...
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          direction: rtl;
        }
        .Description {
          font-size: 0.8rem;
          margin-top: -3%;

          //it will cut the text more than 3 line with ...
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          direction: rtl;
        }
        .PriceBox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          align-self: center;
          padding: 3vh;
        }
        .PriceBox div {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .PriceBox div h3 {
          margin: 0;
          font-size: 0.8rem;
        }
        .PriceBox div h3:first-child {
          margin-bottom: 0.5rem;
        }
        .cross::before,
        .cross::after {
          content: "";
          position: absolute;
          width: 7px;

          background-color: rgba(255, 0, 0, 0.85);
          border-radius: 500vw;
          transform: rotate(-45deg);
          animation: cross 0.6s linear forwards;
          animation-delay: 1s;
        }
        .cross::after {
          transform: rotate(45deg);
        }
        @keyframes cross {
          0% {
            height: 0%;
            background-color: rgba(255, 0, 0, 0.85);
          }

          100% {
            height: 100%;
          }
        }
        .Price {
          font-size: 0.8rem;
        }
        .PriceWithUs {
          font-size: 0.8rem;
        }

        .BTN {
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: var(--blue) solid 1px;
          color: var(--blue);
          border-radius: 5px;
          padding: 0.5rem 0;
          cursor: pointer;
          transition: all linear 0.3s;
        }
        .BTN:hover {
          border: var(--blue) solid 1px;
          color: white;
          background: var(--blue);
        }
      `}</style>
    </div>
  );
}
