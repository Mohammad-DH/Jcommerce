import axios from "axios";
import React from "react";

const remove = async (Product_Id) => {
  await axios.post("/api/product/remove", { Product_Id: Product_Id });
};

export default function Item({ obj }) {
  const { Product_Id, Price, PriceWithUs, Followers, Following, Posts, Link, Name, Description, Image, Category } = obj;

  return (
    <div className="itemWrapper">
      <div className="Glass controller">
        <span onClick={() => remove(Product_Id)}>X</span>
      </div>
      <div className="Item">
        <img src={Image.split("/public")[1]} alt="" />

        <div className="texts">
          <span>{Category.Name}</span>
          <span>{Name}</span>
          <p>{Description}</p>
          <a href={Link}>منبع</a>
          <div className="status">
            <span>{Followers}</span>
            <span>{Following}</span>
            <span>{Posts}</span>
          </div>{" "}
          <div className="prices">
            <span>{Price}</span>
            <span>{PriceWithUs}</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .itemWrapper {
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
        }
        .controller {
          height: 20vh;
          width: 2%;
        }

        .Item {
          width: 97%;
          height: 20vh;
          display: flex;
          align-items: flex-start;
          border: 1px solid rgba(255, 255, 255, 0.85);
          overflow: auto;
          text-align: right;
          border-radius: 0.7rem;
        }

        .Item img {
          width: 20%;
        }

        .texts {
          padding: 1rem;
          padding-left: 0;
          width: 80%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-evenly;
          overflow-y: auto;
        }

        .header {
          display: flex;
          align-items: flex-start;
        }

        .header h4 {
          margin-left: 5%;
        }
      `}</style>
    </div>
  );
}
