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

  if (token) {
    let user = await ValidateToken(token);

    if (user.data.Admin === true) {
      return { props: { user: user.data } };
    }

    return { props: { mess: "not a admin" } };
  } else {
    return { props: { mess: 404 } };
  }
}
