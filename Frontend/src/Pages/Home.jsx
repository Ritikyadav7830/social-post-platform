import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../Components/Index'
import { API_URL } from "../config";


function Home() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPost, setTotalPost] = useState(1);
   
    const authStatus = useSelector((state) => state.auth.status)
    const auth = useSelector((state) => state.auth.userData?._id)
    const userData = useSelector((state) => state.auth.userData)


useEffect(() => {
    if (!auth) return;

    const fetchPosts = async () => {
        try {
            let url =
                    `${API_URL}/api/v1/posts/my-posts?page=${currentPage}`;
            const response = await fetch(url,
                {
                    credentials: "include",
                }
            );

            const result = await response.json();

            if (result.success) {
                setPosts(result.data.posts);
                setTotalPages(result.data.totalPages);
                setTotalPost(result.data.totalPosts);
            }
        } catch (error) {
            console.log(error);
        } finally {
        setLoading(false);
    }
    };

    fetchPosts();
}, [auth, currentPage]);

    // user not logged in
    if (!authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">
                        Login to read posts
                    </h1>
                </Container>
            </div>
        )
    }

    if (loading) {
    return (
        <div className="text-center py-8">
            Loading...
        </div>
    );
}

    // logged in but no posts
    if (posts.length == 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">
                        No posts available
                    </h1>
                </Container>
            </div>
        )
    }

   return (
<div className="w-full py-8">
    <Container>

        {/* Dashboard Card */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 mb-10">

    <div>
        <h2 className="text-4xl font-bold text-gray-800">
            👋 Welcome Back,
            <span className="text-indigo-600">
                {" "}{userData?.fullName}
            </span>
        </h2>

        <p className="text-gray-500 mt-2">
            Glad to see you again.
        </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

        <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-sm">
                Username
            </p>

            <h3 className="font-semibold text-lg mt-1">
                {userData?.username}
            </h3>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-sm">
                Email
            </p>

            <h3 className="font-semibold text-lg mt-1 break-all">
                {userData?.email}
            </h3>
        </div>

        <div className="bg-indigo-600 text-white p-5 rounded-2xl">
            <p className="text-sm opacity-80">
                Total Posts
            </p>

            <h3 className="text-3xl font-bold mt-1">
                {totalPost}
            </h3>
        </div>

    </div>

     </div>

        {/* Posts Heading */}
    <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
            My Posts
        </h2>
    </div>

        {/* Posts */}
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post._id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
            {Array.from(
                { length: totalPages },
                (_, index) => (
                    <button
                        key={index}
                        onClick={() =>
                            setCurrentPage(index + 1)
                        }
                        className={`w-11 h-11 rounded-xl transition-all duration-200 ${
                            currentPage === index + 1
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "bg-white border border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {index + 1}
                    </button>
                )
            )}
        </div>

    </Container>
</div>
)
}

export default Home