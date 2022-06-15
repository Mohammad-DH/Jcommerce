import React, { useId } from "react";
import { PrismaClient } from "@prisma/client";
import Card from "../../Repo/Components/Shop/List/Card";
const prisma = new PrismaClient();

export default function index({ Products }) {
  return (
    <div className="shop">
      <div className=" list">
        {Products.map((e, index) => {
          return <Card id={index} e={e} />;
        })}
      </div>
      <div className="Glass filter"></div>
      <div className="pagination"></div>
      <style jsx>{`
        .shop {
          padding-top: 4vh;
          width: 100%;
          height: fit-content;
          display: flex;
          align-items: flex-start;
          justify-content: space-evenly;
          text-align: right;
          user-select: none;
        }
        .filter {
          width: 25%;
          height: 60vh;
        }
        .list {
          width: 70%;
          height: fit-content;
          display: flex;
          align-items: flex-start;
          justify-content: space-evenly;
          flex-wrap: wrap;
          padding-bottom: 3vh;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = async () => {
  const Products = await prisma.Product.findMany({
    include: {
      Category: {
        select: {
          Name: true,
          Image: true,
        },
      },
    },
  });

  return {
    props: {
      Products,
    },
  };
};
