import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Categories({ categories }) {
  console.log(categories);
  return (
    <div>
      {categories.map((e) => {
        return <h3 key={e.Name}>{e.Name}</h3>;
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  let categories = await prisma.Category.findMany({});

  return {
    props: {
      categories,
    },
  };
};
