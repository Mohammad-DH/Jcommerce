import { PrismaClient } from "@prisma/client";
import IncomingForm from "formidable/src/Formidable";
const prisma = new PrismaClient();

import mv from "mv";

export const AddCategoryAsync = async (req, res, next) => {
  const form = new IncomingForm();
  form.parse(req, async function (err, fields, files) {
    let { Name } = fields;

    let exist = await prisma.Category.findMany({
      where: {
        Name,
      },
    });

    if (!exist[0]) {
      let Image = await saveFile(files.Image);
      let Category = await prisma.Category.create({
        data: {
          Name,
          Image,
        },
      });

      return Category;
    }
  });

  return "there is another product with this name";
};

const saveFile = async (file) => {
  const oldPath = file.filepath;
  let newPath = `./public/CategoryIcons/${file.originalFilename}`;
  mv(oldPath, newPath, function (err) {
    err && console.log(err);
  });
  return file.originalFilename;
};

export async function UpdateCategoryAsync(Category) {
  const { Category_Id, Name, Image } = Category;

  let res = await prisma.Category.update({
    where: {
      Category_Id,
    },
    data: {
      Name,
      Image,
    },
  });
}
export async function RemoveCategoryAsync(Category_Id) {
  let res = await prisma.Category.delete({
    where: {
      Category_Id,
    },
  });
}
export async function ReadCategoryAsync() {
  let res = await prisma.Category.findMany();
  return res;
}
