import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../Repo/Methodes/authentication/ValidateToken";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  let token = req.cookies.jwtToken;
  let user = await ValidateToken(token);
  if (token) {
    if (user) {
      user = await prisma.User.findFirst({
        where: {
          User_Id: user.data.User_Id,
        },
        include: {
          Orders: true,
        },
      });
      if (user) {
        res.status(200).json({ user });
      }
    }
  } else {
    res.status(201).json({ mess: "not logged in" }); // 401
  }
}
