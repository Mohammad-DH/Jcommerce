import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import FilterPanel from "../../Repo/Components/Shop/filter/FilterPanel";
import List from "../../Repo/Components/Shop/List/List";
import axios from "axios";
const prisma = new PrismaClient();

export default function Index({ Products, PriceRange, categories, Pages }) {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [Fetched, setFetched] = useState();

  const GetPage = (pageNumber) => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/shop/pagination",
      data: {
        pageNumber,
      },
    }).then((res) => {
      if (res.status === 200) {
        setCurrentPage(pageNumber);
        setFetched(res.data.Products);
        console.log(res.data.Products);
      }
    });
  };

  return (
    <div className="shop">
      <FilterPanel PriceRange={PriceRange} categories={categories} />

      {Fetched ? (
        <List Products={Fetched} />
      ) : !Fetched && Products ? (
        <List Products={Products} />
      ) : (
        "loading"
      )}

      <div className="pagination">
        {Pages.map((e, index) => {
          return (
            <h1 key={index} onClick={() => GetPage(e)}>
              {e}
            </h1>
          );
        })}
      </div>

      <style jsx>{`
        .shop {
          padding-top: 4vh;
          width: 100%;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          text-align: right;
          user-select: none;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps = async () => {
  const highest = await prisma.Product.findFirst({
    orderBy: {
      Price: "desc",
    },
    take: 1,
    select: {
      Price: true,
    },
  });
  const lowest = await prisma.Product.findFirst({
    orderBy: {
      Price: "asc",
    },
    take: 1,
    select: {
      Price: true,
    },
  });
  const categories = await prisma.Category.findMany();

  const count = await prisma.Product.count();
  let Pages = [];
  for (
    let index = 0;
    index < Math.ceil(count / parseInt(process.env.pagination_number));
    index++
  ) {
    Pages.push(index + 1);
  }

  const Products = await prisma.Product.findMany({
    include: {
      Category: {
        select: {
          Name: true,
          Image: true,
        },
      },
    },
    orderBy: {
      Price: "desc",
    },
    take: process.pagination_number,
  });

  return {
    props: {
      Products,
      PriceRange: [parseInt(lowest.Price), parseInt(highest.Price)],
      categories,
      Pages,
    },
  };
};
