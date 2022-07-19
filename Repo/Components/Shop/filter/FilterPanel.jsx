import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function ({ Range, setRange, setSelectedCategory, SelectedCategory, PriceRange, categories, filter }) {
  return (
    <div className="Glass panel">
      <div className="filterCategory">
        {categories.map((e) => {
          return (
            <div onClick={() => setSelectedCategory(e.Category_Id)} className={SelectedCategory === e.Category_Id ? "CategoryIcon ActiveCategoryIcon" : "CategoryIcon"}>
              <span>{e.Name}</span>
              <img src={`/CategoryIcons/${e.Image}`} alt="CategoryIcons" />
            </div>
          );
        })}
      </div>

      <div className="filterPrice">
        <div className="slider">
          <div className="range">
            <span className="min">{parseInt(PriceRange[0]).toLocaleString("fa-IR")}</span>
            <span className="max">{parseInt(PriceRange[1]).toLocaleString("fa-IR")}</span>
          </div>
          <Slider range defaultValue={PriceRange} min={parseInt(PriceRange[0])} max={parseInt(PriceRange[1])} onChange={(w) => setRange(w)} />
        </div>
        <div className="selectedRange">
          <h3>{`از ${Range[0].toLocaleString("fa-IR")} تومان تا ${Range[1].toLocaleString("fa-IR")} تومان`}</h3>
        </div>
      </div>

      <div className=" btn">
        <span onClick={() => filter(1)}>فیلتر</span>
      </div>

      <style jsx>{`
        .panel {
          width: 95%;
          height: 20%;
          padding: 0.9vh 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }
        .filterCategory {
          padding: 0.5rem 0;
          width: 48%;
          height: fit-content;
          max-height: 70%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-end;
          overflow: scroll;
        }
        .CategoryIcon {
          height: 2.2rem;
          width: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          padding: 20px 10px;
          margin: 1% 1.5%;
          border-radius: 500rem;
          transition: all 0.3s linear;
          cursor: pointer;
        }
        .CategoryIcon span {
          white-space: nowrap;
        }
        .CategoryIcon img {
          width: 2rem;
          height: 2rem;
          transition: all 0.1s linear;
          border-radius: 500rem;
          margin-left: 5px;
        }
        .CategoryIcon img:hover {
          transform: scale(1.1);
        }
        .ActiveCategoryIcon {
          background-color: var(--blue);
          color: #ffffff;
          transform: scale(1.05);
        }
        //        .ActiveCategoryIcon img {
        //        filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(206deg) brightness(103%) contrast(103%);
        //    }
        .filterPrice {
          width: 48%;
          height: 70%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        .slider {
          width: 90%;
          height: 50%;
          display: flex;
          flex-direction: column;
        }
        .range {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .min {
        }
        .max {
        }
        .selectedRange {
          height: 50%;
        }

        .btn {
          width: 15%;
          padding: 0.5rem 0;
          margin-top: 1rem;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background-color: var(--light-green);
          font-size: 1.1vw;
          border-radius: 0.4rem;
          transition: all 0.8s ease-out;
          cursor: pointer;
        }
        .btn:hover {
          width: 98%;
        }
      `}</style>
    </div>
  );
}
