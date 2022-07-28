import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  let token = req.cookies.jwtToken;
  const { Order_Id, Status } = req.body;

  if (token) {
    let user = await ValidateToken(token);
    user = await prisma.User.findFirst({
      where: {
        User_Id: user.data.User_Id,
      },
    });

    if (user.Admin === true) {
      let Order = await prisma.Order.update({
        where: {
          Order_Id,
        },
        data: {
          Status,
        },
      });
      res.status(200).json({ Order, error: null, mess: "done" });
    }
  } else {
    console.log("3");
    res.status(201).json({ error: null, mess: "no token" });
  }
}
