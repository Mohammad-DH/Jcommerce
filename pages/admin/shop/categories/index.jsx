import React, { useState } from "react";
import ValidateToken from "../../../../Repo/Methodes/authentication/ValidateToken";
import { PrismaClient } from "@prisma/client";
import ClientAddCategory from "../../../../Repo/Methodes/Admin/category/ClientAddCategory";

const prisma = new PrismaClient();

import { useRouter } from "next/router";

export default function Index({ categories }) {
  const router = useRouter();

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
    <div className="category">
      <div className="Glass addForm">
        <input className="name" onChange={(e) => setName(e.target.value)} defaultValue={Name} placeholder="اسم " type="text" />

        <img src={createObjectURL} />
        <input className="file" type="file" name="myImage" onChange={uploadToClient} />

        <h3 onClick={() => ClientAddCategory(Name, Image)}>اضافه کردن</h3>
      </div>

      <div className="list">
        {categories.length > 0
          ? categories.map((e, i) => {
              return (
                <div className="Glass card">
                  <img className="CardCross" src="/icons/cross.png" onClick={() => remove(Product_Id)} />
                  <img className="CardIcon" src={`/CategoryIcons/${e.Image}`} alt="" />
                  <span key={i}>{e.Name}</span>
                </div>
              );
            })
          : ""}
      </div>

      <style jsx>{`
        .category {
          height: 100%;
          min-height: var(--min-height);
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          align-items: flex-start;
          justify-content: space-evenly;
        }
        .addForm {
          width: 18%;
          height: 50vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          align-self: center;
        }
        .name {
          text-align: right;
          width: 80%;
          font-size: 1.3rem;
          padding: 0.5rem 1rem;
          border: rgba(101, 255, 222, 0.8) 1px solid;
          border-radius: 0.5rem;
        }

        .addForm img {
          width: 50%;
        }
        .file {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }

        .addForm h3 {
          background-color: var(--light-green);
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s linear;
        }
        .addForm h3:hover {
          transform: scale(1.05);
        }
        .list {
          width: 78%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-evenly;
        }
        .card {
          position: relative;
          width: 16%;
          height: 27vh;
          margin: 1vw 1.5vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
        .CardIcon {
          width: 60%;
          margin: 1rem 0;
        }
        .CardCross {
          position: absolute;
          top: 1%;
          left: 1%;
          width: 12%;
          cursor: pointer;
          transition: all 0.2s linear;
        }
        .CardCross:hover {
          transform: scale(1.1) translateX(10%) translateY(10%);
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
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  return {
    redirect: {
      destination: "/auth",
      permanent: false,
    },
  };
}
