import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({
    _id,
    title,
    content,
    featuredImage,
    owner,
    createdAt
}) {

    return (
        <Link to={`/post/${_id}`}>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">

                {featuredImage && (
                    <div className="overflow-hidden">
                        <img
                            src={featuredImage}
                            alt={title}
                            className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}

                <div className="p-5 flex flex-col h-[190px]">

                    {/* Content Area */}
                    <div className="flex-1">

                        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                            {title}
                        </h2>

                        <p className="text-gray-600 text-sm line-clamp-1">
                            {content}
                        </p>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">

                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                {owner?.fullName || "Unknown Author"}
                            </p>

                            <p className="text-xs text-gray-500">
                                {createdAt
                                    ? new Date(createdAt).toLocaleDateString()
                                    : ""}
                            </p>
                        </div>

                        <span className="text-indigo-600 font-medium text-sm">
                            Read More →
                        </span>

                    </div>

                </div>

            </div>

        </Link>
    )
}

export default PostCard