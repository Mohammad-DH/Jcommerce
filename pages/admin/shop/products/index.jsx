import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../../Repo/Methodes/authentication/ValidateToken";
import Item from "../../../../Repo/Components/Admin/productPanel/ProductList/productItem";

const prisma = new PrismaClient();

export default function Products({ products }) {
  return (
    <div onClick={() => console.log(products)} className="adminShop">
      <div className="addNewBtn">
        <Link href="/admin/shop/products/add">add new product</Link>
      </div>

      <div className="List">
        {products.map((i) => (
          <div className="Item" key={i.Product_Id}>
            <Item obj={i} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .addNewBtn {
          width: fit-content;
          padding: 1rem 1.5rem;
          margin: 1rem;
          border-radius: 10px;
        }

        .List {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }

        .Item {
          width: 90%;
          margin: 1rem 0;
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
      let products = await prisma.product.findMany({
        include: {
          Category: true,
        },
      });

      return { props: { products } };
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
