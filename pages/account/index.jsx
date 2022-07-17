import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../Repo/Methodes/authentication/ValidateToken";
import Link from "next/link";
import axios from "axios";
const prisma = new PrismaClient();

export default function Index({ mess, user, order }) {
  const [FirstName, setFirstName] = useState(user.FirstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [PhoneNumber, setPhoneNumber] = useState(user.PhoneNumber);
  const [Email, setEmail] = useState(user.Email);

  const [Write, setWrite] = useState(false);

  const btnClick = async () => {
    if (Write) {
      await axios({
        method: "post",
        url: "/api/user/update",
        data: {
          FirstName,
          LastName,
          PhoneNumber,
          Email,
        },
      }).then((res) => {
        console.log(res.data);
        setWrite(false);
      });
    } else {
      setWrite(true);
    }
  };

  if (mess && mess === 404) {
    return (
      <div className="account">
        <span>404</span>
      </div>
    );
  } else if ((user, order)) {
    return (
      <div className="account">
        <div className="Glass panel">
          <div className="info">
            <div className="form">
              <div>
                <input disabled={!Write} onChange={(e) => setFirstName(e.target.value)} value={FirstName} type="text" />
                <span>نام</span>
              </div>

              <div>
                <input disabled={!Write} onChange={(e) => setLastName(e.target.value)} value={LastName} type="text" />
                <span>نام خانوادگی</span>
              </div>

              <div>
                <input disabled={!Write} onChange={(e) => setPhoneNumber(e.target.value)} value={PhoneNumber} type="text" />
                <span>شماره تلفن</span>
              </div>

              <div>
                <input disabled={!Write} onChange={(e) => setEmail(e.target.value)} value={Email} type="text" />
                <span>پست الکترونیک</span>
              </div>
            </div>
            <div onClick={btnClick} className="change">
              {Write ? <span className="btn btnSubmit">تایید</span> : <span className="btn">تغییر</span>}
            </div>
          </div>

          <div className="orders">
            {order
              ? order.map((o) => {
                  return (
                    <Link href={`/shop/product/${o.Product.Name}`}>
                      <div className="cart">
                        <div className="image">
                          <img src={o.Product.Image.split("/public")[1]} alt="" />
                        </div>
                        <div className="detail">
                          <span>{o.Product.Name}</span>
                          <span>هزینه : {o.Product.PriceWithUs}</span>
                          <span>{o.Status} : وضعیت</span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>

        <style jsx>{`
          .account {
            height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .panel {
            width: 100%;
            height: 90%;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-evenly;
          }
          .info {
            width: 45%;
            height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }
          .form {
            width: 100%;
            height: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
          }
          .form div {
            width: 100%;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 4fr 2fr;
            align-items: center;
            background-color: rgba(240, 255, 255, 0.4);
            padding: 0.3vw 0.5vw;
            border-radius: 500rem;
          }
          .form span {
            text-align: right;
          }
          .form input {
            background-color: transparent;
            padding: 0.3rem;
            border: none;
            outline: none;
            text-align: center;
            font-size: 1rem;
          }
          .change {
            width: 100%;
            height: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .orders {
            width: 45%;
            height: 90%;
            border-radius: 0.5rem;
            border: 1px solid white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            overflow: auto;
          }
          .cart {
            width: 95%;
            padding: 0.5vw;
            height: 10vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 0.5rem;
            margin: 1vh 0;
            background-color: rgba(176, 176, 176, 0.4);
            transition: all 0.2s linear;
            cursor: pointer;
          }
          .cart:hover {
            transform: scale(1.02);
          }
          .image {
            width: 50%;
            height: 100%;
            overflow: hidden;
            border-radius: 0.5rem;
          }
          .image img {
            width: 100%;
          }
          .detail {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-around;
          }

          .btn {
            padding: 0.8vw 2vw;
            background-color: var(--blue);
            border-radius: 0.5rem;
            color: white;
            font-size: 1.3vw;
            cursor: pointer;
            transition: all 0.4s linear;
          }
          .btnSubmit {
            background-color: var(--dark-green);
          }
        `}</style>
      </div>
    );
  }
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
    let order = await prisma.Order.findMany({
      where: {
        UserId: user.User_Id,
      },
      include: {
        Product: true,
      },
    });

    return { props: { user, order } };
  } else {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
}
