import {Link} from "react-router-dom";
import {RegisterComponent} from "@/components/RegisterComponent.tsx";

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-4xl font-bold mb-8">Create an Account</h1>
                <RegisterComponent />
                <p className="mt-4">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </main>
        </div>
    )
}

