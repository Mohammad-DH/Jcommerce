import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../Repo/authentication/ValidateToken";
import { MultiSelect } from "react-multi-select-component";
import AddType from "../../../Repo/Components/adminPanel/productPanel/productAddForm/addType";
import addProduct from "../../../Repo/Components/adminPanel/productPanel/productAddForm/addProduct";

const prisma = new PrismaClient();

export default function Products({ categorys }) {
  //image upload
  const [createObjectURL, setCreateObjectURL] = useState(null);
  //form states
  const [Product_Id, setProduct_Id] = useState();
  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [MainImage, setMainImage] = useState();
  const [Gallery, setGallery] = useState("fake");
  const [Types, setTypes] = useState([]);
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

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setMainImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  //set data
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

        {Types.map((e, index) => {
          return <h1 key={index}>{e.Name}</h1>;
        })}
        <h3
          onClick={() =>
            addProduct(Name, Description, MainImage, Types, selected, Gallery)
          }
        >
          new product
        </h3>
      </div>
      <div className="imageForm">
        <img src={createObjectURL} />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
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

export async function getServerSideProps({ req, res }) {
  let token = req.cookies.jwtToken;

  if (token) {
    let user = await ValidateToken(token);
    if (user.data.Admin == true) {
      let categorys = await prisma.category.findMany({});
      return { props: { categorys: categorys } };
    }
  }
  return { props: { products: "404" } };
}
