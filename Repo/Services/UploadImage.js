import { IncomingForm } from 'formidable'
import fs from 'fs'


export const ProductImageUpload = async (req) => {
    const form = new IncomingForm();
    form.parse(req, async function (err, fields, files) {
        await saveFile(files.MainImage);
    });
};

const saveFile = async (file) => {
    const oldPath = file.filepath;
    let newPath = `./public/${file.originalFilename}`
    fs.rename(oldPath, newPath, function (err) { })
    return;
};
