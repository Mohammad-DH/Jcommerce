import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { PriceRange, SelectedCategory, PageNumber, OrderBy } = req.body;

  console.log(OrderBy);

  const Products = await prisma.Product.findMany({
    where: {
      PriceWithUs: {
        gte: PriceRange[0],
        lte: PriceRange[1],
      },
      CategoryId: {
        equals: SelectedCategory,
      },
    },
    include: {
      Category: {
        select: {
          Name: true,
          Image: true,
        },
      },
    },
    orderBy: OrderBy ? OrderBy : { NumericFollowers: "desc" },
    skip: (PageNumber - 1) * parseInt(process.env.pagination_number),
    take: parseInt(process.env.pagination_number),
  });

  const Count = await prisma.Product.count({
    where: {
      PriceWithUs: {
        gte: PriceRange[0],
        lte: PriceRange[1],
      },
      CategoryId: {
        equals: SelectedCategory,
      },
    },
  });

  let length = Math.ceil(Count / parseInt(process.env.pagination_number));

  let PageList = Array.from({ length }, (x, i) => i + 1);

  res.status(200).json({ Products, PageList });

  return;
}
