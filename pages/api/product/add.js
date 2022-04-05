import ValidateToken from '../../../Repo/authentication/ValidateToken';
import { AddProductAsync } from '../../../Repo/Services/ProductService';

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req, res) {
    let token = req.cookies.jwtToken;
    let user = await ValidateToken(token);

    if (user && user.data.Admin === true) {
        await AddProductAsync(req, res)
        res.status(200).json({ mess: "ok" })
        return
    }

    res.status(200).json({ mess: "not ok" })
}
