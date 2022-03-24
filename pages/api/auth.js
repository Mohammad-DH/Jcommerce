import { AddUserAsync, RemoveUserCodeAsync, UpdateUserCodeAsync } from '../../Repo/methode/UserMethodes';


export default async function handler(req, res) {
    let User = await UpdateUserCodeAsync(req.body.PhoneNumber)

    if (User) {

        //sms
        res.status(200).json({ mess: "code has been sent" })
        setTimeout(() => {
            RemoveUserCodeAsync(User.User_Id)
        }, 120000);
        return

    } else {

        User = AddUserAsync(req.body.PhoneNumber)
        //sms
        res.status(200).json({ mess: "user created and code has been sent" })

    }

}
