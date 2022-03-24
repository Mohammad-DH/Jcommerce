import Link from "next/link";
import React from "react";
import ValidateToken from "../../Repo/authentication/ValidateToken";

export default function Index({ user }) {
  if (user) {
    return (
      <div>
        <h1>welcome to admin panel</h1>
        <h2>{user}</h2>
        <div className="navbar">
          <Link href="/admin/products">products</Link>
          <br />
          <Link href="/login">login</Link>
        </div>
        <div className=""></div>
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
    return { props: { user: user.data.FirstName } };
  } else {
    return { props: { mess: 404 } };
  }
}
