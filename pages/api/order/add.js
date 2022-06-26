import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  let token = req.cookies.jwtToken;
  const { Product_Id } = req.body;

  if (token) {
    let user = await ValidateToken(token);
    user = await prisma.User.findFirst({
      where: {
        User_Id: user.data.User_Id,
      },
    });

    if (user && user.FirstName && user.LastName) {
      let exist = await prisma.Order.findFirst({
        where: {
          UserId: user.User_Id,
          ProductId: Product_Id,
          Status: "pending",
        },
      });
      if (!exist) {
        let Order = await prisma.Order.create({
          data: {
            ProductId: Product_Id,
            UserId: user.User_Id,
          },
        });
        res.status(200).json({ error: null, mess: "successful", Order });
      } else {
        res.status(201).json({ error: null, mess: "you already have this" }); //put it in serversideprops
      }
    } else {
      res.status(201).json({ error: null, mess: "not completed" });
    }
  } else {
    res.status(201).json({ error: null, mess: "no token" });
  }
}
