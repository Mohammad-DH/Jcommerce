import ValidateToken from '../../../Repo/Methodes/authentication/ValidateToken';
import { UpdateProductAsync } from '../../../Repo/Services/ProductService';


export default async function handler(req, res) {
    let token = req.cookies.jwtToken;
    let user = await ValidateToken(token);

    if (user && user.data.Admin === true) {
        await UpdateProductAsync(req, res)
        console.log(req.body)
        res.status(200).json({ mess: "ok" })
        return
    }

    res.status(200).json({ mess: "not ok" })
}
