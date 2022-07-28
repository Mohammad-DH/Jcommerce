import axios from "axios";
import React, { useState } from "react";

export default function Item({ i }) {
  const [Status, setStatus] = useState(i.Status);

  const change = async () => {
    axios({
      method: "post",
      url: "/api/order/status",
      data: {
        Order_Id: i.Order_Id,
        Status: Status === "pending" ? "confirmed" : "pending",
      },
    }).then((res) => {
      if (res.status === 200) {
        Status === "pending" ? setStatus("confirmed") : setStatus("pending");
      }
    });
  };

  return (
    <div className="Glass Item" key={i.Order_Id}>
      <div className="ItemContent">
        <div className="">
          <span>{i.Product.Name}</span>
          <a href={i.Product.Link}>ادرس</a>
          <span>{i.Product.PriceWithUs}</span>
        </div>
        <div className="">
          <span>{i.User.FirstName}</span>
          <span>{i.User.LastName}</span>
          <span>{i.User.PhoneNumber}</span>
          <span>{i.User.Email}</span>
        </div>
      </div>
      <div className="ItemStatus">
        <span className={Status === "pending" ? "red" : "green"} onClick={change}>
          {Status === "pending" ? Status : "confirmed"}
        </span>
      </div>
      <style jsx>{`
        .Item {
          width: 90%;
          min-height: 10vh;
          margin: 1rem 0;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;
        }
        .ItemContent {
          width: 80%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-evenly;
        }
        .ItemContent div {
          width: 60%;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: flex-start;
        }
        .ItemContent span {
          margin: 1vw;
        }
        .ItemStatus {
          width: 10%;
          min-height: 6vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: white;
          padding: 1rem 1.5rem;
        }
        .ItemStatus span {
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .red {
          background-color: red;
        }
        .green {
          background-color: green;
        }
      `}</style>
    </div>
  );
}
