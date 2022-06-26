import { PrismaClient } from "@prisma/client";
import cookie from "cookie";
import jsonwebtoken from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { PhoneNumber, Code } = req.body;

  if (Code && Code.length == 6 && PhoneNumber.length == 11) {
    let User = await prisma.User.findFirst({
      where: {
        PhoneNumber,
        Code,
      },
    });

    if (User) {
      const jwtToken = jsonwebtoken.sign(
        {
          data: { User_Id: User.User_Id },
        },
        process.env.JWTsecret,
        { expiresIn: "24h" }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwtToken", jwtToken, {
          httpOnly: true,
          //secure
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
          path: "/",
        })
      );
      if (User.Admin === true) {
        res.status(200).json({ redirect: "/admin", User });
      } else {
        res.status(200).json({ redirect: "/", User });
      }

      return;
    }
  }

  res.status(201).json({ mess: "try againe" });
}
