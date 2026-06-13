import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <footer className="bg-slate-900 text-white border-t border-gray-200 mt-16">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">

                    {/* Left */}
                    <div>
                        <Logo width="80px" />

                        <p className="text-gray-500 mt-3 max-w-md">
                            A modern social post platform built with
                            MERN Stack where users can create,
                            manage and explore posts.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex gap-8">

                        <Link
                            to="/"
                            className="text-gray-600 hover:text-indigo-600 transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/all-posts"
                            className="text-gray-600 hover:text-indigo-600 transition"
                        >
                            Posts
                        </Link>

                        <Link
                            to="/add-post"
                            className="text-gray-600 hover:text-indigo-600 transition"
                        >
                            Create
                        </Link>

                    </div>

                </div>

                <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-gray-500 text-sm">
                        © 2025 Social Post App. All rights reserved.
                    </p>

                    <p className="text-gray-500 text-sm">
                        Built with React, Node.js, Express & MongoDB
                    </p>

                </div>

            </div>

        </footer>
    )
}

export default Footer