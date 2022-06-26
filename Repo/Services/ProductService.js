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
    let ScrapedData = await ScreenshotAsync(Link);

    console.log(ScrapedData.text);

    let Posts = ScrapedData.text.split("posts")[0];

    let NumericPosts = Posts.replaceAll(",", "");

    if (
      NumericPosts.split(".")[1] &&
      NumericPosts.split(".")[1].includes("K")
    ) {
      NumericPosts = parseInt(
        NumericPosts.split(".")[0] +
          NumericPosts.split(".")[1].replaceAll("K", "00")
      );
    } else {
      NumericPosts = parseInt(NumericPosts.replaceAll("K", "000"));
    }

    ///////////////////////////////////////////////////////////////////
    let Followers = ScrapedData.text.split("posts")[1].split("followers")[0];

    let NumericFollowers = Followers.replaceAll(",", "");

    if (
      NumericFollowers.split(".")[1] &&
      NumericFollowers.split(".")[1].includes("K")
    ) {
      NumericFollowers = parseInt(
        NumericFollowers.split(".")[0] +
          NumericFollowers.split(".")[1].replaceAll("K", "00")
      );
    } else {
      NumericFollowers = parseInt(NumericFollowers.replaceAll("K", "000"));
    }
    /////////////////////////////////////////////
    let Following = ScrapedData.text
      .split("posts")[1]
      .split("followers")[1]
      .split("following")[0];

    let NumericFollowing = Following.replaceAll(",", "");

    if (
      NumericFollowing.split(".")[1] &&
      NumericFollowing.split(".")[1].includes("K")
    ) {
      NumericFollowing = parseInt(
        NumericFollowing.split(".")[0] +
          NumericFollowing.split(".")[1].replaceAll("K", "00")
      );
    } else {
      NumericFollowing = parseInt(NumericFollowing.replaceAll("K", "000"));
    }

    let product = await prisma.Product.create({
      data: {
        Name,
        Description,
        Image: ScrapedData.path,
        Price: parseInt(Price),
        PriceWithUs: parseInt(PriceWithUs),
        Link,
        CategoryId: parseInt(SelectedCategory),
        Posts,
        Followers,
        Following,
        NumericPosts,
        NumericFollowers,
        NumericFollowing,
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
