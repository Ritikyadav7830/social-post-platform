import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './Index.js'
import { useForm } from 'react-hook-form'

function Signup() {

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const create = async (data) => {

        setError("")
        setSuccess("")

        try {

            const response = await fetch(
                "http://localhost:8000/api/v1/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Signup failed")
            }

            // success message
            setSuccess("Account created successfully. Please sign in.")

            // form reset
            reset()

            // optional redirect after 2 sec
            // setTimeout(() => {
            //     navigate("/login")
            // }, 2000)

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
                    Create Account
                </h2>

                <p className="text-gray-500 mt-2">
                    Join the platform and start sharing your posts
                </p>

                <p className="mt-4 text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Sign In
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
                    className="
w-full
rounded-xl
border
border-gray-300
px-4
py-3
outline-none
focus:border-indigo-500
focus:ring-2
focus:ring-indigo-200
transition
"
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("fullName", {
                            required: true,
                        })}
                    />

                    <Input
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-200
                        transition
                        "
                        label="Username"
                        placeholder="Choose a username"
                        {...register("username", {
                            required: true,
                        })}
                    />

                    <Input
                    className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-200
                    transition
                    "
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                        })}
                    />

                    <Input
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-200
                        transition
                        "
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        {...register("password", {
                            required: true,
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer"
                    >
                        Create Account
                    </Button>

                </div>

            </form>

        </div>

    </div>
)
}

export default Signup