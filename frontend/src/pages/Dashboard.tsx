import {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import {useNavigate} from "react-router";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export default function Dashboard() {
    const [username, setUsername] = useState<string | null>(null)
    const [token, setToken] = useState('')
    const [expires, setExpires] = useState<number>(null)
    const navigate = useNavigate()

    useEffect(() => {
        refreshToken()
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token', { withCredentials: true })
            setToken(response.data.token)
            const decoded = jwtDecode(response.data.token);
            setUsername(decoded.name)
            setExpires(decoded.exp)
        } catch (error) {
            console.log(error)
        }
    }

    const jwt = axios.create();
    jwt.interceptors.request.use(async (config) => {
        const date = new Date()
        if (expires * 1000 < date.getTime()) {
            const response = await axios.get('http://localhost:5000/token', { withCredentials: true })
            config.headers.Authorization = `Bearer ${response.data.token}`

            const decoded = jwtDecode(token)
            setUsername(decoded.name)
            setExpires(decoded.exp)
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    const getUsers = async () => {
        const response = await jwt.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        })
        console.log(response.data)
    }

    const handleLogout = async () => {
        try {
            await axios.delete("http://localhost:5000/logout", { withCredentials: true })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
                <p className="text-2xl mb-8">Hello, {username}!</p>
                <Button className="bg-black text-white rounded hover:bg-black/80" onClick={getUsers}>Show users</Button>
                <Button className="bg-black text-white rounded hover:bg-black/80 mt-4" onClick={handleLogout}>Logout</Button>
            </main>
        </div>
    )
}

