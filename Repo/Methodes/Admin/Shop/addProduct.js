import axios from "axios";

const addProduct = async (
  Name,
  Description,
  SelectedCategory,
  Price,
  PriceWithUs,
  Link,
  setLoading
) => {
  setLoading(true);
  axios({
    method: "post",
    url: "/api/product/add",
    data: {
      Name,
      Description,
      SelectedCategory,
      Price,
      PriceWithUs,
      Link,
    },
  }).then((res) => {
    setLoading(false);
  });
};

export default addProduct;
