import React, { useState } from "react";

export default function AddType({ setTypes, Types }) {
  const [Name, setName] = useState();
  const [Price, setPrice] = useState();
  const [Color, setColor] = useState();
  const [Inventory, setInventory] = useState();

  const add = () => {
    var tempArr = Types;
    tempArr.push({ Name, Price, Color, Inventory });
    setTypes(tempArr);
  };

  return (
    <div className="typeForm">
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
        defaultValue={Color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="رنگ"
        type="text"
      />
      <input
        defaultValue={Inventory}
        onChange={(e) => setInventory(parseInt(e.target.value))}
        placeholder="تعداد در انبار"
        type="number"
      />
      <span onClick={add}>ADD</span>
    </div>
  );
}
