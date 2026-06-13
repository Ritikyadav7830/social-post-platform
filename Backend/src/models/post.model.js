import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
     type: String,
     trim: true,
    },

    featuredImage: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    }

  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);