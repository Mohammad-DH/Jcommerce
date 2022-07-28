import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../../Repo/Methodes/authentication/ValidateToken";
import addProduct from "../../../../Repo/Methodes/Admin/Shop/addProduct";

const prisma = new PrismaClient();

export default function Products({ categories }) {
  const [Loading, setLoading] = useState(false);
  //form states
  const [Name, setName] = useState();
  const [Description, setDescription] = useState();
  const [Price, setPrice] = useState();
  const [PriceWithUs, setPriceWithUs] = useState();
  const [Link, setLink] = useState();

  // selected category
  const [SelectedCategory, setSelectedCategory] = useState([]);

  return (
    <div className="addForm">
      {Loading ? (
        <div className="wait">
          <span>در حال گرفتن عکس از صفحه اینستاگرام</span>
          <span>این عمل حدود 30 ثانیه طول میکشد لطفا صبور باشید</span>
        </div>
      ) : (
        ""
      )}
      <div className="detailForm">
        <input onChange={(e) => setName(e.target.value)} defaultValue={Name} placeholder="اسم کالا" type="text" />
        <input onChange={(e) => setPrice(e.target.value)} defaultValue={Price} placeholder="قیمت" type="text" maxLength={10} />
        <input onChange={(e) => setPriceWithUs(e.target.value)} defaultValue={PriceWithUs} placeholder="قیمت با بارکد" type="text" maxLength={10} />
        <input onChange={(e) => setLink(e.target.value)} defaultValue={Link} placeholder="ادرس" type="text" />

        <div className="categoryList">
          {categories.map((e) => {
            return (
              <h4 className={SelectedCategory === e.Category_Id ? "activeCategory" : ""} onClick={() => setSelectedCategory(e.Category_Id)} key={e.Category_Id}>
                {e.Name}
              </h4>
            );
          })}
        </div>
        <textarea onChange={(e) => setDescription(e.target.value)} defaultValue={Description} placeholder="توضیحات کالا" maxLength={2000} />
        <h3 className=" btn" onClick={() => addProduct(Name, Description, SelectedCategory, Price, PriceWithUs, Link, setLoading)}>
          new product
        </h3>
      </div>
      <style jsx>{`
        .addForm {
          position: relative;
          width: 100%;
          height: var(--min-height);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wait {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--min-height);
          background-color: rgba(203, 231, 255, 0.5);
          z-index: 900;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }

        .detailForm {
          position: relative;
          width: 90%;
          height: 60%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-evenly;
        }

        .detailForm input {
          height: 5vh;
          width: 45%;
          text-align: right;
        }

        .detailForm textarea {
          height: 15vh;
          width: 90%;
          text-align: right;
        }
        .categoryList {
          margin: 1rem 0;
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        .categoryList h4 {
          margin: 1rem 1.5rem;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s linear;
        }
        .activeCategory {
          background-color: var(--blue);
          color: white;
          border-radius: 500rem;
        }
        .btn {
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          align-self: center;
          cursor: pointer;
          transition: all 0.2s linear;
          font-size: 1.3rem;
          background-color: var(--light-green);
        }
        .btn:hover {
          transform: scale(1.05);
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

    if (user.Admin == true) {
      let categories = await prisma.category.findMany({});
      console.log(categories);
      return { props: { categories: categories } };
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
