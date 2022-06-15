import axios from "axios";

const updateProduct = async (Product_Id,Name,Description) => {
    await axios.post("/api/product/update", {
        Product_Id,
        Name,
        Description,
    });
};
export default updateProduct;