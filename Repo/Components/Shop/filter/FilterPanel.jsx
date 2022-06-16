import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";

export default function ({ PriceRange }) {
  const [Range, setRange] = useState(PriceRange);

  const filter = () => {
    axios({
      method: "post",
      url: "/api/product/filter",
      data: {
        PriceRange: Range,
        //category
        //pagination
      },
    }).then((res) => {
      setLoading(false);
      console.log(res.data);
    });
  };

  return (
    <div className="Glass panel">
      <div className="filterCategory">sss</div>

      <div className="btn">
        <span onClick={filter}>فیلتر</span>
      </div>

      <div className="filterPrice">
        <div className="slider">
          <div className="range">
            <span className="min">{PriceRange[0]}</span>
            <span className="max">{PriceRange[1]}</span>
          </div>
          <Slider
            range
            defaultValue={PriceRange}
            min={parseInt(PriceRange[0])}
            max={parseInt(PriceRange[1])}
            onChange={(w) => setRange(w)}
          />
        </div>
        <div className="selectedRange">
          <h3>{`از ${Range[0]} تومان تا ${Range[1]} تومان`}</h3>
        </div>
      </div>

      <style jsx>{`
        .panel {
          width: 90%;
          height: 20vh;
          display: flex;
          align-items: center;
        }
        .filterPrice {
          width: 45%;
          height: 70%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          align-self: flex-start;
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
        .filterCategory {
          width: 45%;
          height: 70%;
          align-self: flex-start;
        }
        .btn {
          width: 10%;
          height: 80%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .btn span {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
