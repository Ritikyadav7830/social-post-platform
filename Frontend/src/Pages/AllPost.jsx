import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../Components/Index'
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const searchQuery = searchParams.get("search");




useEffect(() => {

    const fetchPosts = async () => {

        try {

             setLoading(true);
             setPosts([]);

            let url =
                    `${API_URL}/api/v1/posts/get-posts?page=${currentPage}`;

            if (searchQuery) {
                url =
                    `${API_URL}/api/v1/posts/search?query=${searchQuery}&page=${currentPage}`;
            }

            const response = await fetch(url);

            const result = await response.json();

            if (result.success) {
                setPosts(result.data.posts)
                setTotalPages(result.data.totalPages);
                console.log(result)
            }

        } catch (error) {
            console.log(error);
        }
         finally {

        setLoading(false);

    }
    };

    fetchPosts();

}, [searchQuery, currentPage]);


if (loading) {
    return (
        <div className="text-center py-8">
            Loading...
        </div>
    );
}


if (searchQuery && posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <h1 className="text-2xl font-bold">
                    No posts found for "{searchQuery}"
                </h1>
            </Container>
        </div>
    );
}

  return (
    <div className='w-full py-4'>
        <Container>
                  {/* Posts Heading */}
    <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
            All Posts
        </h2>
    </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                <PostCard key={post._id} {...post} />
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

export default AllPosts