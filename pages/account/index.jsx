import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../Repo/Methodes/authentication/ValidateToken";
const prisma = new PrismaClient();

export default function Index({ mess, user, order }) {
  const [FirstName, setFirstName] = useState(user.FirstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [PhoneNumber, setPhoneNumber] = useState(user.PhoneNumber);
  const [Email, setEmail] = useState(user.Email);
  const [Tab, setTab] = useState(1);

  const tabList = [
    { id: 1, title: "اطلاعات کاربری" },
    { id: 2, title: "سفارشات" },
  ];

  if (mess && mess === 404) {
    return (
      <div className="account">
        <span>404</span>
      </div>
    );
  } else if ((user, order)) {
    return (
      <div className="account">
        <div className="panel">
          {Tab === 1 ? (
            <div className="info">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={FirstName}
                type="text"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={LastName}
                type="text"
              />
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={PhoneNumber}
                type="text"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                type="text"
              />
            </div>
          ) : Tab === 2 ? (
            <div className="order">
              {order
                ? order.map((o) => {
                    console.log(o);
                  })
                : ""}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="sidePanel">
          {tabList.map((e) => {
            return <span onClick={() => setTab(e.id)}>{e.title}</span>;
          })}
        </div>
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
    return { props: { mess: 404 } };
    //redirect to login
  }
}
