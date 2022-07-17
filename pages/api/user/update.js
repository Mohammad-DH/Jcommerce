import { PrismaClient } from "@prisma/client";
import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { FirstName, LastName, PhoneNumber, Email } = req.body;
  let token = req.cookies.jwtToken;
  if (token) {
    let user = await ValidateToken(token);
    user = await prisma.User.findFirst({
      where: {
        User_Id: user.data.User_Id,
      },
    });

    if (user) {
      user = await prisma.User.update({
        where: {
          User_Id: user.User_Id,
        },
        data: {
          FirstName,
          LastName,
          PhoneNumber,
          Email,
        },
      });
      res.status(200).json({ error: null, mess: "successful", user });
      return;
    }
  }
  res.status(400).json({ error: "no token", mess: "no token" });
}
