import { PrismaClient } from "@prisma/client";
import { ScreenshotAsync } from "./Screenshot";

const prisma = new PrismaClient();

export const AddProductAsync = async (req, res, next) => {
  let { Name, Description, SelectedCategory, Price, PriceWithUs, Link } =
    req.body;

  let exist = await prisma.Product.findMany({
    where: {
      OR: [{ Name }, { Link }],
    },
  });

  if (!exist[0]) {
    let imagePath = await ScreenshotAsync(Link);

    let product = await prisma.Product.create({
      data: {
        Name,
        Description,
        Image: imagePath,
        Price,
        PriceWithUs,
        Link,
        CategoryId: parseInt(SelectedCategory),
      },
    });

    return product;
  }

  return "there is another product with this name";
};

export const UpdateProductAsync = async (req, res, next) => {
  const { Product_Id, Name, Description } = req.body;

  let product = await prisma.Product.update({
    where: {
      Product_Id,
    },
    data: {
      Name,
      Description,
    },
  });

  return product;
};

export const DeleteProductAsync = async (req, res, next) => {
  const { Product_Id } = req.body;

  let product = await prisma.Product.delete({
    where: {
      Product_Id,
    },
  });

  return product;
};
