import axios from "axios";
import React from "react";

const remove = async (Product_Id) => {
  await axios.post("/api/product/remove", { Product_Id: Product_Id });
};

export default function Item({ obj }) {
  const { Product_Id, Price, PriceWithUs, Followers, Following, Posts, Link, Name, Description, Image, Category } = obj;

  return (
    <div className="itemWrapper">
      <div className=" controller">
        <img src="/icons/cross.png" onClick={() => remove(Product_Id)} />
      </div>
      <div className="Item">
        <img src={Image.split("/public")[1]} alt="" />

        <div className="texts">
          <span>{Category.Name}</span>
          <span>{Name}</span>
          <p>{Description}</p>
          <a href={Link}>منبع</a>
          <div className="status">
            <span>Followers : {Followers}</span>
            <span>Following : {Following}</span>
            <span>Posts : {Posts}</span>
            <span>Price : {Price}</span>
            <span>PriceWithUs : {PriceWithUs}</span>
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
        .controller img {
          width: 100%;
          transition: all 0.2s linear;
          cursor: pointer;
        }
        .controller img:hover {
          transform: scale(1.1);
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
        .status {
          margin-top: 2vh;
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
