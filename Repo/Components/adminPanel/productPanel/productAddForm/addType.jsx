import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function AddType({ add }) {
  const [Name, setName] = useState();
  const [Price, setPrice] = useState();
  const [Color, setColor] = useState();
  const [Inventory, setInventory] = useState();

  return (
    <div style={{ borderColor: Color }} className="typeForm">
      <HexColorPicker color={Color} onChange={setColor} />
      <input
        defaultValue={Name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اسم نوع"
        type="text"
      />
      <input
        defaultValue={Price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="قیمت"
        type="text"
      />
      <input
        defaultValue={Inventory}
        onChange={(e) => setInventory(parseInt(e.target.value))}
        placeholder="تعداد در انبار"
        type="number"
      />
      <span onClick={() => add(Name, Price, Color, Inventory)}>ADD</span>
      <style jsx>{`
        .typeForm {
          width: 14vw;
          height: 55vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border: 3px solid;
          border-radius: 1rem;
        }
        .typeForm input {
          width: 100%;
          font-size: 1.3rem;
          padding: 0.5rem;
          border: 1px solid gray;
          border-radius: 1rem;
          text-align: right;
        }
        .typeForm input:focus {
          outline: rgb(7, 255, 139) 2px solid;
          border: none;
        }
        .typeForm span {
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.4rem 1.5rem;
          border-radius: 10px;
          transition: all 0.2s linear;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .typeForm span:hover {
          color: white;
          background-color: black;
        }
      `}</style>
    </div>
  );
}
