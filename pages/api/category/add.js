import ValidateToken from "../../../Repo/Methodes/authentication/ValidateToken";
import { AddCategoryAsync } from "../../../Repo/Services/CategoryService";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  let token = req.cookies.jwtToken;
  let user = await ValidateToken(token);

  if (user && user.data.Admin === true) {
    await AddCategoryAsync(req, res);
    res.status(200).json({ mess: "ok" });
    return;
  }

  res.status(200).json({ mess: "not ok" });
}
