import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const LikesPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
//   console.log("likes controller ke andr post", post)

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const userId = req.user._id;
//   console.log(userId)

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();

return res.status(200).json(
  new ApiResponse(
    200,
    {
      likesCount: post.likes.length,
      liked: !alreadyLiked,
    },
    alreadyLiked
      ? "Post unliked successfully"
      : "Post liked successfully"
  )
);
});

export { LikesPost };