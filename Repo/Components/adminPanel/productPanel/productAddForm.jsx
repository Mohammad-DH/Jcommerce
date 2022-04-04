import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import addProduct from "./productAddFormMore/addProduct";
import AddType from "./productAddFormMore/addType";
import updateProduct from "./productAddFormMore/updateProduct";

export default function AddForm({ obj, categorys }) {
  const [Product_Id, setProduct_Id] = useState();
  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [MainImage, setMainImage] = useState("fake");
  const [Gallery, setGallery] = useState("fake");
  const [Types, setTypes] = useState([]);

  const [Cat, setCat] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    var tempArr = [];
    categorys.map((e) => {
      tempArr.push({ label: e.Name, value: e.Category_Id });
    });
    setCat(tempArr);
    /* if its for updating */
    if (obj && obj.Product_Id) {
      setProduct_Id(obj.Product_Id);
      setName(obj.Name);
      setDescription(obj.Description);
      setMainImage(obj.MainImage);
      setGallery(obj.Gallery);
      setTypes(obj.Types);
      obj.Categorys.map((e) => {
        tempArr.push({ label: e.Name, value: e.Category_Id });
      });
      setSelected(tempArr);
    }
  }, []);

  return (
    <div className="addForm">
      <div className="detailForm">
        <input
          onChange={(e) => setName(e.target.value)}
          defaultValue={Name}
          placeholder="اسم کالا"
          type="text"
        />
        <MultiSelect
          options={Cat}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
          className="categorys"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={Description}
          placeholder="توضیحات کالا"
        />

        <AddType Types={Types} setTypes={setTypes} />
        <br />
        <br />
        <br />
        <h3
          onClick={() =>
            Product_Id
              ? updateProduct(
                  Product_Id,
                  Name,
                  Description,
                  MainImage,
                  Types,
                  selected,
                  Gallery
                )
              : addProduct(
                  Name,
                  Description,
                  MainImage,
                  Types,
                  selected,
                  Gallery
                )
          }
        >
          {Product_Id ? "update" : "new product"}
        </h3>
      </div>
      <div className="imageForm">
        <input placeholder="image!" type="file" />
        <input type="file" />
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
          text-align: right;
        }
        .detailForm textarea {
          height: 15vh;
          width: 90%;
          text-align: right;
        }
        .imageForm {
          width: 25%;
          height: 90%;
        }
      `}</style>
    </div>
  );
}
