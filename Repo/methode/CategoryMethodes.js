import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// Categorys: [ { label: 'cat2', value: 1 } ],
export async function AddCategoryAsync(Category, Product_Id) {

    const { value, Name, Image } = Category
    let exist = await prisma.Category.findMany(
        {
            where: {
                Category_Id: value
            }
        }
    )

    //when we have no product Id and this is a new category
    if (!exist[0] && !Product_Id) {
        let res = await prisma.Category.create(
            {
                data: {
                    Name,
                    Image,
                }
            }
        )

    }
    //when we have product Id and this is a new category
    else if (!exist[0]) {
        let res = await prisma.Category.create(
            {
                data: {
                    Name,
                    Image,
                    Product: { connect: { Product_Id: Product_Id } }
                }
            }
        )

    }
    //when we have the category and Product_Id
    else if (exist[0] && Product_Id) {
        let res = await prisma.Category.update(
            {
                where: {
                    Category_Id: exist[0].Category_Id
                },
                data: {
                    Product: { connect: { Product_Id: Product_Id } }
                }
            }
        )
    }
}

export async function UpdateCategoryAsync(Category) {

    const { Category_Id, Name, Image } = Category

    let res = await prisma.Category.update(
        {
            where: {
                Category_Id
            },
            data: {
                Name,
                Image
            }
        }
    )
}
export async function RemoveCategoryAsync(Category_Id) {

    let res = await prisma.Category.delete(
        {
            where: {
                Category_Id
            }
        }
    )

}
export async function ReadCategoryAsync() {

    let res = await prisma.Category.findMany()
    return res;

}
