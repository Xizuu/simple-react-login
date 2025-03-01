import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
        if (err) return res.sendStatus(403)
        req.email = decode.email;

        next();
    })
}