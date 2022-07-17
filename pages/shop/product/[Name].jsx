import React, { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import gsap, { Linear } from "gsap";
import axios from "axios";
import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";
import OrderBTN from "../../../Repo/Components/Shop/product/OrderBTN";

const prisma = new PrismaClient();

export default function ProductDetailes({ Details, user, exist, userIsCompleted, isLoggedIn }) {
  const [T1, setT1] = useState(gsap.timeline({ paused: true }));
  const [Active, setActive] = useState(false);

  useEffect(() => {
    T1.to(".image", { duration: 3, bottom: 0, ease: Linear.easeNone });
  }, []);

  const down = () => {
    T1.timeScale(1).play();
  };
  const up = () => {
    T1.timeScale(T1.duration() - 1).reverse();
  };

  const Order = async () => {
    if (isLoggedIn) {
      if (userIsCompleted) {
        await axios({
          url: "/api/order/add",
          method: "post",
          withCredentials: true,
          data: {
            Product_Id: Details.Product_Id,
          },
        }).then((res) => {
          if (res.status === 200) {
            setActive(true);
            console.log(res.data);
          }
        });
      } else {
        router.push("/account");
      }
    } else {
      router.push("/auth");
    }
  };

  if (Details) {
    return (
      <div className="detailFrame">
        <div className="Glass detail">
          <div className="imageBox">
            <img className="image" onMouseEnter={down} onMouseLeave={up} src={Details.Image.split("/public")[1]} alt="" />
          </div>

          <div className="Glass status">
            <div className="">
              <span>Posts</span>
              <span>{Details.Posts}</span>
            </div>
            <div className="">
              <span>Followers</span>
              <span>{Details.Followers}</span>
            </div>
            <div className="">
              <span>Following</span>
              <span>{Details.Following}</span>
            </div>
          </div>

          <div className="Glass info">
            <div className="category">
              <span>{Details.Category.Name}</span>
              <img src={`/CategoryIcons/${Details.Category.Image}`} alt="Category icon" />
            </div>
            <h2 className="Name">{Details.Name}</h2>
            <p className="Description">{Details.Description}</p>

            <div className="price">
              <div className="price1">
                <span>هزینه با ما :</span>
                <span>{Details.PriceWithUs}</span>
              </div>
              <div className="price2">
                <span>هزینه :</span>
                <span>{Details.Price}</span>
              </div>
            </div>

            <OrderBTN exist={exist} Active={Active} Order={Order} userIsCompleted={userIsCompleted} isLoggedIn={isLoggedIn} />
          </div>
        </div>

        <style jsx>{`
          .detailFrame {
            text-align: right;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 95vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .detail {
            width: 95%;
            height: 90%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
          }
          .imageBox {
            position: relative;
            width: 25%;
            height: 90%;
            overflow: hidden;
            border-radius: 1rem;
          }
          .image {
            position: absolute;
            left: 0;
            width: 100%;
            border-radius: 1rem;
          }
          .status {
            border-radius: 1rem;
            width: 10%;
            height: 90%;
            background: rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            font-size: 1.4vw;
          }
          .status div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 7vh 0;
          }
          .info {
            border-radius: 1rem;
            position: relative;
            width: 50%;
            height: 90%;
            padding: 1vw;
            background: rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
          }
          .category {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .category span {
            font-size: 0.8vw;
            margin-right: 0.5vw;
          }
          .category img {
            width: 3vh;
            height: 3vh;
          }
          .Name {
            font-size: 1.8vw;
          }
          .Description {
            font-size: 0.8vw;
          }
          .price {
            margin-top: 3vh;
            width: 90%;
            align-self: center;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            font-size: 1.3vw;
            background-color: var(--blue);
            color: white;
            padding: 2vh 0;
            border-radius: 0.4vw;
          }
        `}</style>
      </div>
    );
  } else {
    return "";
  }
}

export async function getServerSideProps({ req, res, query }) {
  let Details = await prisma.Product.findFirst({
    where: {
      Name: query.Name,
    },
    include: {
      Category: true,
    },
  });

  let token = req.cookies.jwtToken;
  let user;
  let exist;
  let isLoggedIn = false;
  let userIsCompleted = false;

  if (token) {
    user = await ValidateToken(token);

    user = await prisma.User.findFirst({
      where: {
        User_Id: user.data.User_Id,
      },
    });

    if (user) {
      isLoggedIn = true;

      if (user.FirstName !== "" && user.LastName !== "" && user.Email !== "") {
        userIsCompleted = true;
      }
    }

    exist = await prisma.Order.findFirst({
      where: {
        UserId: user.User_Id,
        ProductId: Details.Product_Id,
        Status: "pending",
      },
    });
  }

  return {
    props: {
      user: user ? user : null,
      Details,
      exist: exist ? exist : null,
      userIsCompleted,
      isLoggedIn,
    },
  };
}
