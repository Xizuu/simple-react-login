"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router";

interface AuthFormProps {
    type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(`Username: ${username}`)
        console.log(`Email: ${email}`)
        console.log(`Password: ${password}`)
        // Simpan username ke localStorage untuk simulasi autentikasi sederhana
        // localStorage.setItem("username", username)
        //
        // navigate('/dashboard')
        // router.push("/dashboard")
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{type === "login" ? "Login" : "Register"}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {type === "register" && (
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="submit" className="w-full bg-black hover:bg-black/80 text-white rounded">{type === "login" ? "Login" : "Register"}</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

