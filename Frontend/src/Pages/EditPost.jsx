import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../Components/Index'
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {postId} = useParams()
    const navigate = useNavigate()

 useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/posts/${postId}`
            );

            const result = await response.json();

            if (result.success) {
                setPosts(result.data);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    };

    if (postId) {
        fetchPost();
    }
}, [postId, navigate]);



  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost