import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";
import { AddProductAsync } from "../../../Repo/Services/ProductService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  let token = req.cookies.jwtToken;
  let user = await ValidateToken(token);

  user = await prisma.User.findFirst({
    where: {
      User_Id: user.data.User_Id,
    },
  });

  if (user.Admin === true) {
    await AddProductAsync(req, res).then(() => {
      res.status(200).json({ mess: "added" });
    });

    return;
  }

  res.status(200).json({ mess: "not ok" });
}
