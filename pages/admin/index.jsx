import Link from "next/link";
import React from "react";
import ValidateToken from "../../Repo/Methodes/authentication/ValidateToken";

export default function Index({ user }) {
  if (user) {
    return (
      <div>
        <h1>welcome to admin panel</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>404</h1>
      </div>
    );
  }
}

export async function getServerSideProps({ req, res }) {
  let token = req.cookies.jwtToken;
  console.log(1)
  if (token) {
    console.log(2)
    let user = await ValidateToken(token);
    console.log(user)
    if (user.data.Admin === true){
      console.log(3)
      return { props: { user: user.data } };
    }
    console.log(4)
    console.log(user.data.Admin)
    return { props: { mess: "not a admin" } };
  } else {
    console.log(6)
    return { props: { mess: 404 } };
  }
}
