import React, { useState } from "react";
import ValidateToken from "../../../../Repo/Methodes/authentication/ValidateToken";
import { PrismaClient } from "@prisma/client";
import ClientAddCategory from "../../../../Repo/Methodes/Admin/category/ClientAddCategory";

const prisma = new PrismaClient();

export default function Index({ categories }) {
  //image upload
  const [createObjectURL, setCreateObjectURL] = useState(null);

  //form states
  const [Name, setName] = useState();
  const [Image, setImage] = useState();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  return (
    <div>
      <div className="addForm">
        <input
          onChange={(e) => setName(e.target.value)}
          defaultValue={Name}
          placeholder="اسم "
          type="text"
        />

        <div className="imageForm">
          <img src={createObjectURL} />
          <h4>Select Image</h4>
          <input type="file" name="myImage" onChange={uploadToClient} />
        </div>

        <h3 onClick={() => ClientAddCategory(Name, Image)}>new category</h3>
      </div>

      <div className="">
        {categories.length > 0
          ? categories.map((e, i) => {
              return <span key={i}>{e.Name}</span>;
            })
          : ""}
      </div>

      <style jsx>{`
        .addForm {
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-evenly;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  let token = req.cookies.jwtToken;

  if (token) {
    let user = await ValidateToken(token);

    user = await prisma.User.findFirst({
      where: {
        User_Id: user.data.User_Id,
      },
    });

    if (user.Admin === true) {
      let categories = await prisma.Category.findMany();

      return { props: { categories } };
    }
  }
  return { props: { categories: "404" } };
}
