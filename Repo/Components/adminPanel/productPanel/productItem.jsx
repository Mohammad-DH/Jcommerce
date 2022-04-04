import axios from "axios";
import React from "react";

const remove = async (Product_Id) => {
  await axios.post("/api/product/remove", { Product_Id: Product_Id });
};

export default function Item({ obj }) {
  const {
    Product_Id,
    Name,
    Description,
    MainImage,
    Categorys,
    Gallery,
    Types,
  } = obj;

  return (
    <div className="Item">
      <img src="" alt="" />
      <div className="texts">
        <div className="header">
          <h3>{Name}</h3>
          {Categorys.map((i) => (
            <h4 key={i.Category_Id}>{i.Name}</h4>
          ))}
        </div>
        <p>{Description}</p>
      </div>
      <div className="controler">
        <span onClick={() => remove(Product_Id)}>X</span>
      </div>
      <style jsx>{`
        .Item {
          width: 100%;
          height: 20vh;
          display: flex;
          align-items: flex-start;
          border: 1px solid black;
        }
        .Item img {
          width: 20vh;
          height: 20vh;
        }
        .texts {
          width: 100%;
          padding: 0 2.5%;
        }
        .header {
          display: flex;
          align-items: flex-start;
        }
        .header h4 {
          margin-left: 5%;
        }
        .controler {
          width: 4vw;
          height: 100%;
          background-color: red;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
}
