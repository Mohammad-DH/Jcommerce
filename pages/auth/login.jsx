import axios from "axios";
import React from "react";

export default function login() {
  const auth = async () => {
    await axios.post("/api/auth", { PhoneNumber: "09162821510" });
  };
  const post = async () => {
    await axios.post("/api/login", {
      PhoneNumber: "09162821510",
      Code: "638022",
    });
  };

  return (
    <div>
      <h1 onClick={auth}>Auth</h1>
      <h1 onClick={post}>login</h1>
    </div>
  );
}
