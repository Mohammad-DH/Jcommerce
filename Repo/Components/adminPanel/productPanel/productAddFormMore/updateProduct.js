import axios from "axios";

const updateProduct = async (
    Product_Id,
    Name,
    Description,
    MainImage,
    Types,
    Categorys,
    Gallery
) => {

    await axios.post("/api/product/add", {
        Product_Id,
        Name,
        Description,
        MainImage,
        Types,
        Categorys,
        Gallery,
    });
};
export default updateProduct;