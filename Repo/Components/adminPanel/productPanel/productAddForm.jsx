import axios from "axios";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const post = async (Product_Id) => {
  await axios.post("/api/product/add", { Product_Id: Product_Id });
};

export default function AddForm({ obj, categorys }) {
  const {
    Product_Id,
    Name,
    Description,
    MainImage,
    Categorys,
    Gallery,
    Types,
  } = obj;

  const [Cat, setCat] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    var tempArr = [];
    categorys.map((e) => {
      tempArr.push({ label: e.Name, value: e.Category_Id });
    });
    setCat(tempArr);
  }, []);

  return (
    <div className="addForm">
      <div className="detailForm">
        <input placeholder="name" type="text" />

        <MultiSelect
          options={Cat}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          className="categorys"
        />

        <textarea placeholder="description" />
      </div>
      <div onClick={() => console.log(Cat)} className="imageForm">
        <input placeholder="image!" type="text" />
      </div>

      <style jsx>{`
        .addForm {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-start;
        }
        .detailForm {
          position: relative;
          width: 75%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .detailForm input {
          height: 5vh;
          width: 45%;
        }
        .detailForm textarea {
          height: 15vh;
          width: 90%;
        }
        .imageForm {
          width: 25%;
          height: 90%;
        }
      `}</style>
    </div>
  );
}
