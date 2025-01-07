import jwt from "jsonwebtoken";
import Users from "../models/UserModel.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401)

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if (!user[0]) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
            if (err) return res.sendStatus(403)

            const userId = user[0].id
            const name = user[0].name
            const email = user[0].email

            const token = jwt.sign({
                userId, name, email
            }, process.env.SECRET_TOKEN, { expiresIn: '15s' })
            
            res.json({ token })
        })
    } catch (error) {
        console.log(error)
    }
}