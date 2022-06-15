import ValidateToken from '../../../Repo/Methodes/authentication/ValidateToken';
import {DeleteProductAsync} from '../../../Repo/Services/ProductService';


export default async function handler(req, res) {
    let token = req.cookies.jwtToken;
    let user = await ValidateToken(token);

    if (user && user.data.Admin === true) {
        await DeleteProductAsync(req)
        res.status(200).json({mess: "ok"})
        return
    }

    res.status(200).json({mess: "not ok"})
}