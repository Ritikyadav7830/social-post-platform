import { Router } from "express";
import { createPost, getMyPosts ,getAllPosts, getPostById, updatePost, deletePost, searchPosts } from "../controllers/post.controller.js";
import { LikesPost } from "../controllers/Likes.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()


//secured routes
router.route("/create-post").post(
    verifyJWT,
    upload.single("featuredImage"),
    createPost
);
router.route("/my-posts").get(
    verifyJWT,
     getMyPosts
);
router.route("/get-posts").get(
    getAllPosts
)

router.route("/search")
.get(searchPosts);


router.route("/:postId/like")
.patch(verifyJWT, LikesPost);


router.route("/:postId")
.get(getPostById)
.patch(verifyJWT,
upload.single("featuredImage"),
 updatePost)
.delete(verifyJWT, deletePost);





// http://localhost:8000/api/v1/posts/create-post

export default router