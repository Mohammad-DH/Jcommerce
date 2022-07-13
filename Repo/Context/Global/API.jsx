import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const root = createContext();

function API({ children }) {
  const [User, setUser] = useState();
  const [Orders, setOrders] = useState();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [UserIsCompleted, setUserIsCompleted] = useState(false);

  useEffect(() => {
    axios({
      method: "post",
      url: "/api/verify",
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      if (res.status === 200) {
        UserInit(res.data.user);
      }
    });
  }, []);

  const UserInit = (User) => {
    if (User) {
      setUser(User);
      setIsLoggedIn(true);
      setOrders(User.Orders);
      if (User.FirstName !== "" && User.LastName !== "" && User.Email !== "") {
        setUserIsCompleted(true);
      }
    }
  };

  return (
    <div>
      <root.Provider value={{ User, Orders, IsLoggedIn, UserIsCompleted, UserInit }}>{children}</root.Provider>
    </div>
  );
}

export default API;
