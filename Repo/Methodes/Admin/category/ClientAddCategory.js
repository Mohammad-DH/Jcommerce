import axios from "axios";

const ClientAddCategory = async (Name, Image) => {
  const form = new FormData();

  form.append("Name", Name);

  form.append("Image", Image);

  axios({
    method: "post",
    url: "/api/category/add",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default ClientAddCategory;
