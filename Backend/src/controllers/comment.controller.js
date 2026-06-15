import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";



const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  if (!text?.trim()) {
    throw new ApiError(400, "Comment text is required");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const comment = await Comment.create({
    text,
    owner: req.user._id,
    post: postId,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      comment,
      "Comment added successfully"
    )
  );
});

const getPostComments = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    const comments = await Comment.find({
        post: postId
    })
    .populate("owner", "fullName username")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            comments,
            "Comments fetched successfully"
        )
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You can delete only your own comment"
        );
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Comment deleted successfully"
        )
    );
});

const updateComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params;
    const { text } = req.body;

    if (!text?.trim()) {
        throw new ApiError(400, "Comment text is required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (
        comment.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can update only your own comment"
        );
    }

    comment.text = text;
    comment.isEdited = true;

    await comment.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            comment,
            "Comment updated successfully"
        )
    );
});

export 
{
    addComment,
    getPostComments,
    deleteComment,
    updateComment
}