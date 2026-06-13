import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../Components/Index";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { postId } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/v1/posts/${postId}`
                );

                const result = await response.json();

                if (result.success) {
                    setPost(result.data);

                    setLikesCount(result.data.likes?.length || 0);

                    const liked = result.data.likes?.some(
                        (id) => id.toString() === userData?._id
                    );

                    setIsLiked(liked);
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        };

        fetchPost();
        fetchComments();
    }, [postId, navigate, userData]);

    const isAuthor =
        post && userData
            ? post.owner?._id === userData?._id
            : false;

    const handleLike = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/posts/${post._id}/like`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();

            if (result.success) {
                setLikesCount(result.data.likesCount);
                setIsLiked(result.data.liked);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/posts/${post._id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();

            if (result.success) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchComments = async () => {
    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/comments/${postId}/comments`
        );

        const result = await response.json();

        if (result.success) {
            setComments(result.data);
        }

    } catch (error) {
        console.log(error);
    }
    };

    const addComment = async () => {
    if (!commentText.trim()) return;

    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/comments/${post._id}/comment`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: commentText,
                }),
            }
        );

        const result = await response.json();

        if (result.success) {
            setCommentText("");

            fetchComments(); // latest comments reload
        }

    } catch (error) {
        console.log(error);
    }
    };


    const handleDeleteComment = async (commentId) => {
    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/comments/${commentId}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        const result = await response.json();

        if (result.success) {
            fetchComments();
        }
    } catch (error) {
        console.log(error);
    }
    };

 const handleEditClick = (comment) => {
    setCommentText(comment.text);
    setEditingCommentId(comment._id);
    setIsEditing(true);
    };

  const handleUpdateComment = async () => {

    if (!commentText.trim()) return;

    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/comments/${editingCommentId}`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: commentText,
                }),
            }
        );

        const result = await response.json();

        if (result.success) {
            setCommentText("");
            setEditingCommentId(null);
            setIsEditing(false);

            fetchComments();
        }

    } catch (error) {
        console.log(error);
    }
};



    if (!post) {
        return (
            <div className="py-8 text-center">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="py-8">
            <Container>

                {isAuthor && (
                    <div className="flex justify-end mb-4">
                        <Link to={`/edit-post/${post._id}`}>
                            <Button
                                bgColor="bg-green-500"
                                className="mr-3"
                            >
                                Edit
                            </Button>
                        </Link>

                        <Button
                            bgColor="bg-red-500"
                            onClick={deletePost}
                        >
                            Delete
                        </Button>
                    </div>
                )}

                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold">
                        {post.title}
                    </h1>
                </div>

                <div className="mb-4 flex items-center gap-4">
                    <span className="text-gray-600">
                        Author: {post.owner?.fullName}
                    </span>

                    <button
                        onClick={handleLike}
                        className="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition"
                    >
                        {isLiked ? "❤️" : "🤍"} {likesCount}
                    </button>
                </div>

                {post?.featuredImage && (
                    <div className="bg-white rounded-xl p-5 shadow mb-5">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full max-h-[400px] object-cover rounded-xl"
                        />
                    </div>
                )}

                <div className="bg-white rounded-xl p-5 shadow">
                    <p>{post.content}</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow mt-5">
    <h2 className="text-2xl font-bold mb-4">
        Comments ({comments.length})
    </h2>


    <div className="mb-5">
    <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border rounded-lg p-3 resize-none"
        rows="3"
    />

    {/* <button
        onClick={addComment}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
        Post Comment
    </button> */}

    <button 
    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    onClick={
        isEditing
            ? handleUpdateComment
            : addComment
    }
>
    {isEditing
        ? "Update Comment"
        : "Post Comment"}
</button>
</div>




    {comments.length === 0 ? (
        <p className="text-gray-500">
            No comments yet
        </p>
    ) : (
        comments.map((comment) => (
            <div
                key={comment._id}
                className="bg-gray-50 rounded-lg p-3 mb-3"
            >
                <h4 className="font-semibold">
                    {comment.owner?.fullName}
                </h4>

   <p className="text-gray-700">
    {comment.text}

    {comment.isEdited && (
        <span className="text-xs text-gray-500 ml-2">
            (edited)
        </span>
    )}
</p>

        {comment.owner?._id === userData?._id && (
  <div className="flex gap-3 mt-2">
 <button
    onClick={() =>
        handleEditClick(comment)
    }
    className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
>
    Edit
</button>

    <button
      onClick={() =>
        handleDeleteComment(comment._id)
      }
      className="text-red-500 cursor-pointer hover:text-red-700 transition"
    >
      Delete
    </button>
  </div>
)}
                
            </div>
        ))
    )}
</div>

            </Container>
        </div>
    );
}