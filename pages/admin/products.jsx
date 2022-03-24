import React from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../Repo/authentication/ValidateToken";

const prisma = new PrismaClient();

export default function products({ products }) {
  console.log(products);
  return <div>products</div>;
}

export async function getServerSideProps({ req, res }) {
  let token = req.cookies.jwtToken;

  if (token) {
    let user = await ValidateToken(token);
    console.log(user);
    if (user.data.Admin == true) {
      let products = await prisma.product.findMany();
      return { props: { products: products } };
    }
  }
  return { props: { products: "products" } };
}
