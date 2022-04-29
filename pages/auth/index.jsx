import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Code, setCode] = useState("");

  const auth = async (PN) => {
    await axios.post("/api/auth", { PhoneNumber: PN });
  };
  const post = async (PN, code) => {
    await axios.post("/api/login", {
      PhoneNumber: PN,
      Code: code,
    });
  };

  return (
    <div>
      <div className="LoginForm">
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="PhoneNumber"
          type="text"
        />
        <input
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
          type="text"
        />
        <span onClick={(e) => auth(PhoneNumber)}>Send SMS</span>
        <span onClick={(e) => post(PhoneNumber, Code)}>Login</span>
      </div>
    </div>
  );
}
