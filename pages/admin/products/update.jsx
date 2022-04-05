import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../Repo/authentication/ValidateToken";
import { MultiSelect } from "react-multi-select-component";
import AddType from "../../../Repo/Components/adminPanel/productPanel/productAddForm/addType";
import updateProduct from "../../../Repo/Components/adminPanel/productPanel/productAddForm/updateProduct";

const prisma = new PrismaClient();

export default function Products({ categorys, query }) {
  //form states
  const [Product_Id, setProduct_Id] = useState(query.Product_Id);
  const [Name, setName] = useState(query.Name);
  const [Description, setDescription] = useState(query.Description);
  const [MainImage, setMainImage] = useState(query.MainImage);
  const [Gallery, setGallery] = useState(query.Gallery);
  const [Types, setTypes] = useState(query.Types);
  //category list and selected category
  const [Cat, setCat] = useState([]);
  const [selected, setSelected] = useState([]);
  //just for refresh
  const [Refresh, setRefresh] = useState(0);

  //add new type
  const addType = (Name, Price, Color, Inventory) => {
    var tempArr = Types;
    let exist = false;

    tempArr.forEach((e) => {
      if (e.Name === Name) {
        exist = "true";
      }
    });

    if (exist === false) {
      tempArr.push({ Name, Price, Color, Inventory });
      setTypes(tempArr);
      setRefresh(Refresh + 1);
    }
  };

  //set data
  useEffect(() => {
    var tempArr = [];
    categorys.map((e) => {
      tempArr.push({ label: e.Name, value: e.Category_Id });
    });
    setCat(tempArr);
    /*for updating */

    if (query) {
      setProduct_Id(query.Product_Id);
      setName(query.Name);
      setDescription(query.Description);
      setMainImage(query.MainImage);
      setGallery(query.Gallery);
      setTypes(query.Types);

      query.Categorys
        ? query.Categorys.map((e) => {
            tempArr.push({ label: e.Name, value: e.Category_Id });
          })
        : tempArr.push({ label: "no category", value: -1 });

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

        <AddType add={addType} />

        {Types
          ? Types.map((e, index) => {
              return <h1 key={index}>{e.Name}</h1>;
            })
          : "no Types"}
        <h3
          onClick={() =>
            updateProduct(
              Product_Id,
              Name,
              Description,
              MainImage,
              Types,
              selected,
              Gallery
            )
          }
        >
          update
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

export async function getServerSideProps({ req, query }) {
  let token = req.cookies.jwtToken;

  if (token) {
    let user = await ValidateToken(token);
    if (user.data.Admin == true) {
      let categorys = await prisma.category.findMany({});
      return { props: { categorys, query } };
    }
  }
  return { props: { products: "404" } };
}
