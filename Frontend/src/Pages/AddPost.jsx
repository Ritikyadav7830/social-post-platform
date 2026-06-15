import React from 'react'
import { Container, PostForm } from '../Components/Index'

function AddPost() {
  return (
    <div className="py-4 px-4 md:px-0">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost