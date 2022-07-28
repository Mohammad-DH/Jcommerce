import React from "react";
import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../../Repo/Methodes/authentication/ValidateToken";
import Item from "../../../../Repo/Components/Admin/productPanel/orderPanel/Item";

const prisma = new PrismaClient();

export default function Products({ orders }) {
  return (
    <div onClick={() => console.log(orders)}>
      <div className="List">
        {orders.map((i) => {
          return <Item i={i} />;
        })}
      </div>
      <style jsx>{`
        .List {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
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
      let orders = await prisma.Order.findMany({
        include: {
          Product: true,
          User: true,
        },
      });

      return { props: { orders } };
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
