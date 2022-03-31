import axios from "axios";


const addProduct = async (
    Name,
    Description,
    MainImage,
    Types,
    Categorys,
    Gallery
) => {
    await axios.post("/api/product/add", {
        Name,
        Description,
        MainImage,
        Types,
        Categorys,
        Gallery,
    });
};
export default addProduct;