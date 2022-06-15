import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function ProductDetailes({ Detailes }) {
  console.log(Detailes);
  return <div>ProductDetailes</div>;
}

export const getStaticPaths = async () => {
  let AllPaths = await prisma.Product.findMany({
    select: {
      Name: true,
    },
  });
  const paths = AllPaths.map((Item) => ({
    params: { Name: Item.Name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  let Detailes = await prisma.Product.findFirst({
    where: {
      Name: params.Name,
    },
  });

  return {
    props: { Detailes },
  };
};
