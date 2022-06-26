import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { PageNumber, OrderBy } = req.body;

  const Products = await prisma.Product.findMany({
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
  res.status(200).json({ Products });

  return;
}
