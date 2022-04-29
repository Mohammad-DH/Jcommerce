import React from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../Repo/authentication/ValidateToken";
import Item from "../../../Repo/Components/adminPanel/productPanel/productItem";

const prisma = new PrismaClient();

export default function Products({ products }) {
  if (products === "404" || !products) {
    return "404";
  } else {
    return (
      <div className="List">
        {products.map((i) => (
          <div className="Item" key={i.Product_Id}>
            <Item obj={i} />
          </div>
        ))}

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
        `}</style>
      </div>
    );
  }
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

      return { props: { products: products } };
    }
  }
  return { props: { products: "404" } };
}
