import formidable from "formidable";
import fs from "fs";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        return await saveFile(files.file);
    });
};

const saveFile = async (file) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/images`, data);
    await fs.unlinkSync(file.path);
    let Path = `./public/images/${data}`;
    return Path;
};


export default async function AddGalleryAsync(Gallery, Product_Id) {

    const { Image } = Gallery

    let exist = await prisma.Gallery.findMany(
        {
            where: {
                Product_Id,
                Image,
            }
        }
    )

    if (!exist[0]) {
        let res = await prisma.Gallery.create(
            {
                data: {
                    Image,
                    Product_Id
                }
            }
        )
    }
}

export default async function RemoveGalleryAsync(Gallery_Id) {
    let Gallery = await prisma.Gallery.delete(
        {
            where: {
                Gallery_Id
            }
        }
    )
    return Gallery
}