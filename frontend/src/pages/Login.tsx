import {Link} from "react-router-dom";
import {LoginComponent} from "@/components/LoginComponent.tsx";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
                <LoginComponent />
                <p className="mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </main>
        </div>
    )
}