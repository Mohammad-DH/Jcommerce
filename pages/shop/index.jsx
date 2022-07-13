import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import FilterPanel from "../../Repo/Components/Shop/filter/FilterPanel";
import List from "../../Repo/Components/Shop/List/List";
import axios from "axios";
const prisma = new PrismaClient();

export default function Index({ Products, PriceRange, categories, Pages }) {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [ProductList, setProductList] = useState(Products);
  const [PageList, setPageList] = useState(Pages);

  //filter component
  const [Range, setRange] = useState(PriceRange);
  const [SelectedCategory, setSelectedCategory] = useState();
  const [SortBy, setSortBy] = useState("بیشترین دنبال کننده");

  var OrderBy;

  const sortList = [
    { title: "بیشترین دنبال کننده", value: { NumericFollowers: "desc" } },
    { title: "بیشترین تعداد پست", value: { NumericPosts: "desc" } },
    { title: "گرانترین", value: { PriceWithUs: "desc" } },
    { title: "ارزانترین", value: { PriceWithUs: "asc" } },
  ];

  const filter = (PageNumber) => {
    axios({
      method: "post",
      url: "/api/shop/filter",
      data: {
        PriceRange: Range,
        SelectedCategory,
        PageNumber,
        OrderBy,
      },
    }).then((res) => {
      setProductList(res.data.Products);
      setPageList(res.data.PageList);
      setCurrentPage(PageNumber);
    });
  };

  const GetPage = (PageNumber) => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/shop/pagination",
      data: {
        PageNumber,
        OrderBy,
      },
    }).then((res) => {
      if (res.status === 200) {
        setProductList(res.data.Products);
        setCurrentPage(PageNumber);
      }
    });
  };

  const handel = async (PageNumber) => {
    if (Range !== PriceRange || SelectedCategory) {
      filter(PageNumber);
    } else {
      GetPage(PageNumber);
    }
  };

  return (
    <div className="shop">
      <FilterPanel
        filter={filter}
        Range={Range}
        setRange={(i) => setRange(i)}
        SelectedCategory={SelectedCategory}
        setSelectedCategory={(i) => setSelectedCategory(i)}
        PriceRange={PriceRange}
        categories={categories}
      />
      <div className="Glass sortList">
        {sortList.map((e, i) => {
          return (
            <h3
              key={i}
              onClick={() => {
                setSortBy(e.title);
                OrderBy = e.value;
                handel(1);
              }}
              className={SortBy === e.title ? "sortItem sortItemActive" : "sortItem"}
            >
              {e.title}
            </h3>
          );
        })}
      </div>
      <div className="secoundFilter"></div>

      {ProductList ? <List Products={ProductList} /> : "loading"}

      <div className="pagination">
        {PageList.map((e, index) => {
          return (
            <h1 key={index} onClick={() => handel(e)}>
              {e}
            </h1>
          );
        })}
      </div>

      <style jsx>{`
        .shop {
          padding-top: 3vh;
          width: 100%;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          text-align: right;
          user-select: none;
        }
        .sortList {
          width: 95%;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-evenly;
          margin-top: 1%;
        }
        .sortItem {
          color: rgba(0, 0, 0, 0.6);
          cursor: pointer;
          transition: all 0.2s linear;
        }
        .sortItem:hover {
          transform: scale(1.03);
        }
        .sortItemActive {
          color: var(--blue);
        }
      `}</style>
    </div>
  );
}
//////////////////////////////////////////////////////// *
//////////////////////////////////////////////////////// *
//////////////////////////////////////////////////////// *
//////////////////////////////////////////////////////// *
export const getStaticProps = async () => {
  const highest = await prisma.Product.findFirst({
    orderBy: {
      PriceWithUs: "desc",
    },
    select: {
      PriceWithUs: true,
    },
  });

  let Highest = highest ? parseInt(highest.PriceWithUs) : 0;

  const lowest = await prisma.Product.findFirst({
    orderBy: {
      PriceWithUs: "asc",
    },
    select: {
      PriceWithUs: true,
    },
  });

  let Lowest = lowest ? parseInt(lowest.PriceWithUs) : 0;

  const categories = await prisma.Category.findMany();

  const count = await prisma.Product.count();
  let length = Math.ceil(count / parseInt(process.env.pagination_number));
  let Pages = Array.from({ length }, (x, i) => i + 1);

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
      NumericFollowers: "desc",
    },
    take: parseInt(process.env.pagination_number),
  });

  return {
    props: {
      Products,
      PriceRange: [Lowest, Highest],
      categories,
      Pages,
    },
  };
};
