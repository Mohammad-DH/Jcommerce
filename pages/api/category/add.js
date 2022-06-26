import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";
import { AddCategoryAsync } from "../../../Repo/Services/CategoryService";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  let token = req.cookies.jwtToken;
  let user = await ValidateToken(token);

  user = await prisma.User.findFirst({
    where: {
      User_Id: user.data.User_Id,
    },
  });

  if (user.Admin === true) {
    await AddCategoryAsync(req, res);
    res.status(200).json({ mess: "ok" });
    return;
  }

  res.status(200).json({ mess: "not ok" });
}
