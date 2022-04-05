import { PrismaClient, Prisma } from '@prisma/client'
import { AddTypeAsync } from '../methode/TypeMethodes'
import { AddCategoryAsync } from '../methode/CategoryMethodes'
import { ProductImageUpload } from './UploadImage'


const prisma = new PrismaClient()

export const AddProductAsync = async (req, res, next) => {
    // const { Name, Description, MainImage, Types, Categorys, Gallery } = req.body

    let exist = await prisma.Product.findMany({
        where: {
            Name,
        }
    })

    if (!exist[0]) {
        let product = await prisma.Product.create({
            data: {
                Name,
                Description,
                MainImage,
            }
        })

        ProductImageUpload(req)

        Types.map(async T => await AddTypeAsync(T, product.Product_Id))
        Categorys.map(async C => await AddCategoryAsync(C, product.Product_Id))

        return product;
    }
    return "there is another product with this name";
}
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