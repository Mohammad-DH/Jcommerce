import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function AddTypeAsync(Type, Product_Id) {
    const { Name, Color, Price, Inventory } = Type

    let exist = await prisma.Type.findMany(
        {
            where: {
                Product_Id,
                Name,
            }
        }
    )

    if (!exist[0]) {
        let res = await prisma.Type.create(
            {
                data: {
                    Name,
                    Color,
                    Price,
                    Inventory,
                    Product_Id
                }
            }
        )
    }

    return exist;
}

export async function RemoveTypeAsync(Type_Id) {
    let Type = await prisma.Type.delete(
        {
            where: {
                Type_Id,
            }
        }
    )
    return Type;
}

export async function UpdateTypeAsync(Type, Type_Id) {
    const { Name, Color, Price, Inventory } = Type
    let Type = await prisma.Type.update(
        {
            where: {
                Type_Id,
            },
            data: {
                Name,
                Color,
                Price,
                Inventory,
            }
        }
    )
    return Type;
}