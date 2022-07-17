import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../../Repo/Methodes/authentication/ValidateToken";
import addProduct from "../../../../Repo/Methodes/Admin/Shop/addProduct";

const prisma = new PrismaClient();

export default function Products({ categories }) {
  const [Loading, setLoading] = useState(false);
  //form states
  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [Price, setPrice] = useState();
  const [PriceWithUs, setPriceWithUs] = useState();
  const [Link, setLink] = useState();

  //category list and selected category
  const [Category, setCategory] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);

  //set data
  useEffect(() => {
    let tempArr = [];
    categories.map((e) => {
      tempArr.push({ label: e.Name, value: e.Category_Id });
    });
    setCategory(tempArr);
  }, []);

  return (
    <div className="addForm">
      <h1>{Loading ? "loading ..." : ""}</h1>
      <div className="detailForm">
        <input onChange={(e) => setName(e.target.value)} defaultValue={Name} placeholder="اسم کالا" type="text" />

        <input onChange={(e) => setPrice(e.target.value)} defaultValue={Price} placeholder="قیمت" type="text" maxLength={10} />
        <input onChange={(e) => setPriceWithUs(e.target.value)} defaultValue={PriceWithUs} placeholder="قیمت با بارکد" type="text" maxLength={10} />
        <input onChange={(e) => setLink(e.target.value)} defaultValue={Link} placeholder="ادرس" type="text" />

        <div className="categoryList">
          {Category.map((e) => {
            return (
              <h4 onClick={() => setSelectedCategory(e.value)} key={e.value}>
                {e.label}
              </h4>
            );
          })}
        </div>

        <textarea onChange={(e) => setDescription(e.target.value)} defaultValue={Description} placeholder="توضیحات کالا" maxLength={2000} />

        <h3 onClick={() => addProduct(Name, Description, SelectedCategory, Price, PriceWithUs, Link, setLoading)}>new product</h3>
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
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  let token = req.cookies.jwtToken;

  if (token) {
    let user = await ValidateToken(token);

    user = await prisma.User.findFirst({
      where: {
        User_Id: user.data.User_Id,
      },
    });

    if (user.Admin == true) {
      let categories = await prisma.category.findMany({});
      return { props: { categories: categories } };
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  return {
    redirect: {
      destination: "/auth",
      permanent: false,
    },
  };
}
