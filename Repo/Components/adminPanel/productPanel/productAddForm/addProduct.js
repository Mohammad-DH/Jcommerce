import axios from "axios";


const addProduct = async (
    Name,
    Description,
    MainImage,
    Types,
    Categorys,
    Gallery
) => {

    const form = new FormData();

    form.append('Name', Name);
    form.append('Description', Description);
    form.append('Types', Types);
    form.append('Categorys', Categorys);
    form.append("MainImage", MainImage);
    form.append("Gallery", Gallery);
    axios({
        method: "post",
        url: "/api/product/add",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
    })
};






export default addProduct;