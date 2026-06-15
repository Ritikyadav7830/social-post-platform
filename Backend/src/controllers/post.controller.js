import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Post} from "../models/post.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken"



const createPost = asyncHandler(async (req, res) => {

    const { title, slug, content, status } = req.body;

    if (!title || !slug) {
        throw new ApiError(400, "Title and slug are required");
    }

    const existedPost = await Post.findOne({ slug });

    if (existedPost) {
        throw new ApiError(409, "Slug already exists");
    }

    // image path from multer
    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "Featured image is required");
    }

    // upload image to cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);

    if (!uploadedImage) {
        throw new ApiError(500, "Image upload failed");
    }

    const post = await Post.create({
        title,
        slug,
        content,
        status,
        featuredImage: uploadedImage.url,
        owner: req.user._id,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            post,
            "Post created successfully"
        )
    );
});

const getMyPosts = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({
         owner: req.user._id
    });

    const totalPages = Math.ceil(
        totalPosts / limit
    );

    const posts = await Post.find({
        owner: req.user._id
    }).populate("owner", "username fullName")
      .skip(skip)
      .limit(limit);

     return res.status(200).json(
        new ApiResponse(
            200,
            {
                posts,
                currentPage: page,
                totalPages,
                totalPosts
            },
            "My posts fetched successfully"
        )
    );  
});

const getAllPosts = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = 9;

    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({
        status: "active"
    });

    const totalPages = Math.ceil(
        totalPosts / limit
    );

    const posts = await Post.find({
        status: "active"
    })
        .populate("owner", "username fullName")
        .skip(skip)
        .limit(limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                posts,
                currentPage: page,
                totalPages,
                totalPosts
            },
            "Posts fetched successfully"
        )
    );
});

const getPostById = asyncHandler(async (req, res) => {

    const { postId } = req.params

    const post = await Post.findById(postId)
        .populate("owner", "username fullName")

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            post,
            "Post fetched successfully"
        )
    )
})

const updatePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;
    const { title, content, status } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can update only your own post");
    }

    let imageUrl = post.featuredImage;

    if (req.file?.path) {
        const uploadedImage = await uploadOnCloudinary(req.file.path);

        if (!uploadedImage) {
            throw new ApiError(500, "Image upload failed");
        }

        imageUrl = uploadedImage.secure_url;
    }

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            $set: {
                title,
                content,
                status,
                featuredImage: imageUrl,
            },
        },
        {
            new: true,
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedPost,
            "Post updated successfully"
        )
    );
});

const deletePost = asyncHandler(async (req, res) => {

    const { postId } = req.params

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can delete only your own post")
    }

    await Post.findByIdAndDelete(postId)

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Post deleted successfully"
        )
    )
})

const searchPosts = asyncHandler(async (req, res) => {

    const { query } = req.query;

    if (!query) {
        throw new ApiError(
            400,
            "Search query is required"
        );
    }

    const page = Number(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({
        title: {
            $regex: query,
            $options: "i"
        }
    });

    const totalPages = Math.ceil(
        totalPosts / limit
    );

    const posts = await Post.find({
        title: {
            $regex: query,
            $options: "i"
        }
    })
        .populate("owner", "fullName username")
        .skip(skip)
        .limit(limit);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                posts,
                currentPage: page,
                totalPages,
                totalPosts
            },
            "Posts fetched successfully"
        )
    );
});


export {
    createPost,
    getMyPosts,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    searchPosts
}