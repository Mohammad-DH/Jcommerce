import { PrismaClient } from '@prisma/client'
import { AddTypeAsync } from '../methode/TypeMethodes'
import { AddCategoryAsync } from '../methode/CategoryMethodes'
import { IncomingForm } from 'formidable'
import fs from 'fs'

const prisma = new PrismaClient()

export const AddProductAsync = async (req, res, next) => {
    const form = new IncomingForm();
    form.parse(req, async function (err, fields, files) {
        let { Name, Description, Types, Categorys } = fields
        Types = JSON.parse(Types)
        Categorys = JSON.parse(Categorys)

        let exist = await prisma.Product.findMany({
            where: {
                Name,
            }
        })

        if (!exist[0]) {
            let MainImage = await saveFile(files.MainImage);
            let product = await prisma.Product.create({
                data: {
                    Name,
                    Description,
                    MainImage,
                }
            })
            Types.map(async T => await AddTypeAsync(T, product.Product_Id))
            Categorys.map(async C => await AddCategoryAsync(C, product.Product_Id))

            return product;
        }
    })

    return "there is another product with this name";
}

const saveFile = async (file) => {
    const oldPath = file.filepath;
    let newPath = `./public/${file.originalFilename}`
    fs.rename(oldPath, newPath, function (err) { })
    return file.originalFilename;
};


export const UpdateProductAsync = async (req, res, next) => {
    const { Product_Id, Name, Description, MainImage } = req.body

    let product = await prisma.Product.update({
        where: {
            Product_Id
        },
        data: {
            Name,
            Description,
            MainImage,
        }
    })

    return product;
}
export const DeletProductAsync = async (req, res, next) => {
    const { Product_Id } = req.body

    let product = await prisma.Product.delete({
        where: {
            Product_Id
        }
    })

    return product;
}
