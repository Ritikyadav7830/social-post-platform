import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, getPostComments, deleteComment, updateComment } from "../controllers/comment.controller.js";

const router = Router();

router.post(
  "/:postId/comment",
  verifyJWT,
  addComment
);

router.get(
    "/:postId/comments",
    getPostComments
);

router.delete(
    "/:commentId",
    verifyJWT,
    deleteComment
);

router.patch(
    "/:commentId",
    verifyJWT,
    updateComment
);

export default router;