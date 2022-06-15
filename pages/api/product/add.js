import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";
import { AddProductAsync } from "../../../Repo/Services/ProductService";

export default async function handler(req, res) {
  let token = req.cookies.jwtToken;
  let user = await ValidateToken(token);

  if (user && user.data.Admin === true) {
    await AddProductAsync(req, res).then(() => {
      res.status(200).json({ mess: "added" });
    });

    return;
  }

  res.status(200).json({ mess: "not ok" });
}
