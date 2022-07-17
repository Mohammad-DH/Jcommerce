import Link from "next/link";
import React from "react";
import ValidateToken from "../../Repo/Methodes/authentication/ValidateToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Index({ user }) {
  if (user) {
    return (
      <div>
        <h1>welcome to admin panel</h1>
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
    console.log(user);

    if (user.Admin === true) {
      return { props: { user } };
    }

    return { props: { mess: "not a admin" } };
  } else {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
}
