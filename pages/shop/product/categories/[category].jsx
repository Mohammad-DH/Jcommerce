import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function ProductList({ products }) {
  console.log(products);
  return <div>ProductList</div>;
}

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query);

  let products = await prisma.product.findMany({
    where: {
      Categorys: {
        some: {
          Name: ctx.query.category,
        },
      },
    },
    include: {
      Categorys: true,
      Gallery: true,
      Types: true,
    },
  });
  return {
    props: { products },
  };
};
