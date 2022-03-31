import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../Repo/authentication/ValidateToken";
import Item from "../../Repo/Components/adminPanel/productPanel/productItem";
import AddForm from "../../Repo/Components/adminPanel/productPanel/productAddForm";

const prisma = new PrismaClient();

export default function Products({ products, categorys }) {
  const [tab, settab] = useState("list");
  console.log(products);
  return (
    <div className="products">
      <span onClick={() => settab("list")}>list</span>
      <span onClick={() => settab("add")}>add</span>
      {tab === "list" ? (
        <div className="List">
          {products.map((i) => (
            <div className="Item" key={i.Product_Id}>
              <Item obj={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="Add">
          <AddForm obj={products} categorys={categorys} />
        </div>
      )}
      <style jsx>{`
        .List {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          background-color: beige;
        }
        .Item {
          width: 90%;
          margin: 1rem 0;
        }
        .Add {
          width: 100%;
          height: 90vh;
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
      let products = await prisma.product.findMany({
        include: {
          Categorys: true,
          Gallery: true,
          Types: true,
        },
      });
      let categorys = await prisma.category.findMany({});
      return { props: { products: products, categorys: categorys } };
    }
  }
  return { props: { products: "404" } };
}
