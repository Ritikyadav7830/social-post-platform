import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from "./Index"
import { useForm } from "react-hook-form"
import { login } from "../Store/Authslice";
import { useDispatch } from "react-redux"
import { API_URL } from "../config";


function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const create = async (data) => {

        setError("")
        setSuccess("")

        try {
            const response = await fetch(
                `${API_URL}/api/v1/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Login failed")
            }

           dispatch(login(result.data.user));

            setSuccess("User login successfully")

            reset()

            // redirect
            setTimeout(() => {
                navigate("/")
            }, 1500)

        } catch (error) {
            setError(error.message)
        }
    }

return (
    <div className="w-full max-w-xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-10">

            <div className="flex justify-center mb-6">
                <Logo width="90px" />
            </div>

            <div className="text-center mb-8">

                <h2 className="text-4xl font-bold text-gray-800">
                    Welcome Back
                </h2>

                <p className="text-gray-500 mt-2">
                    Sign in to continue to your account
                </p>

                <p className="mt-4 text-gray-600">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>

            {error && (
                <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3 text-red-600 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-5 rounded-xl bg-green-50 border border-green-200 p-3 text-green-600 text-sm">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit(create)}>

                <div className="space-y-5">

                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-200"
                    >
                        Sign In
                    </Button>

                </div>

            </form>

        </div>

    </div>
)
}

export default Login