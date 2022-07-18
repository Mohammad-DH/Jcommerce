import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../../Repo/Methodes/authentication/ValidateToken";
import Item from "../../../../Repo/Components/Admin/productPanel/ProductList/productItem";

const prisma = new PrismaClient();

export default function Products({ products }) {
  return (
    <div onClick={() => console.log(products)} className="adminShop">
      <Link href="/admin/shop/products/add">
        <div className="Glass addNew">
          <img className="addNewImage" src="/icons/Plus.png" alt="" />
          <span> add new product</span>
        </div>
      </Link>

      <div className="List">
        {products.map((i) => (
          <div className="Item" key={i.Product_Id}>
            <Item obj={i} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .addNew {
          margin-top: 1vh;
          margin-left: 1rem;
          padding: 0.6rem 1rem;
          width: 9%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s linear;
        }
        .addNew:hover {
          transform: scale(1.05) translateX(1.5rem);
        }
        .addNewImage {
          width: 30%;
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
