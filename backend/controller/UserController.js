import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const Register = async (req, res) => {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.json({
            message: "Register berhasil"
        })
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({
            message: "Password tidak sesuai"
        })

        const userId = user[0].id
        const name = user[0].name
        const email = user[0].email

        const token = jwt.sign({
            userId, name, email
        }, process.env.SECRET_TOKEN, { expiresIn: '20s' })
        const refreshToken = jwt.sign({
            userId, name, email
        }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })

        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        })

        // Add 'secure: true' in production
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ token })
    } catch (error) {
        res.status(404).json({
            message: "Email tidak ditemukan"
        })
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204)

    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    })

    if (!user[0]) return res.sendStatus(204)

    const userId = user[0].id
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}