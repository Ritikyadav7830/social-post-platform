import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../Index";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inputStyles = `
    w-full
    rounded-xl
    border
    border-gray-300
    px-4
    py-3
    outline-none
    focus:border-indigo-500
    focus:ring-2
    focus:ring-indigo-200
    transition
  `;

const submitPost = async (data) => {
  setLoading(true);
  setErrorMsg("");

  try {
    if (
      data.featuredImage?.[0] &&
      data.featuredImage[0].size >
        5 * 1024 * 1024
    ) {
      throw new Error(
        "Image size must be less than 5MB"
      );
    }

    let response;

    if (post) {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("status", data.status);

      if (data.featuredImage?.[0]) {
        formData.append(
          "featuredImage",
          data.featuredImage[0]
        );
      }

      response = await fetch(
        `${API_URL}/api/v1/posts/${post._id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );
    } else {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("content", data.content);
      formData.append("status", data.status);

      if (data.featuredImage?.[0]) {
        formData.append(
          "featuredImage",
          data.featuredImage[0]
        );
      }

      response = await fetch(
        `${API_URL}/api/v1/posts/create-post`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Failed to save post"
      );
    }

    navigate(`/post/${result.data._id}`);
  } catch (error) {
    console.log(error);

    setErrorMsg(
      error.message ||
        "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("slug", post.slug);
      setValue("content", post.content);
      setValue("status", post.status);
    }
  }, [post, setValue]);

  useEffect(() => {
    const subscription = watch(
      (value, { name }) => {
        if (name === "title") {
          setValue(
            "slug",
            slugTransform(value.title),
            {
              shouldValidate: true,
            }
          );
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {post ? "Edit Post" : "Create Post"}
        </h2>

        <p className="text-gray-500 mt-2">
          {post
            ? "Update your existing post"
            : "Create and publish a new post"}
        </p>
      </div>
       
       {errorMsg && (
            <div
                className="
                mb-5
                rounded-xl
                bg-red-50
                border
                border-red-200
                p-3
                text-red-600
                text-sm
                "
            >
                {errorMsg}
            </div>
         )}

      <form
        onSubmit={handleSubmit(submitPost)}
        className="bg-white rounded-3xl shadow-xl border border-gray-200 p-5 md:p-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side */}
          <div className="w-full lg:w-2/3">
            <Input
              label="Title"
              placeholder="Enter post title"
              className={`${inputStyles} mb-5`}
              {...register("title", {
                required: true,
              })}
            />

            <Input
              label="Slug"
              placeholder="Post slug"
              className={`${inputStyles} mb-5`}
              {...register("slug", {
                required: true,
              })}
              onInput={(e) => {
                setValue(
                  "slug",
                  slugTransform(
                    e.currentTarget.value
                  ),
                  {
                    shouldValidate: true,
                  }
                );
              }}
            />

            <div className="mb-5">
              <label className="block mb-2 font-medium text-gray-700">
                Content
              </label>

              <textarea
                rows="8"
                placeholder="Write your content..."
                className={`${inputStyles} resize-none`}
                {...register("content", {
                  required: true,
                })}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/3">
            <Input
              label="Featured Image"
              type="file"
              className={`${inputStyles} mb-5`}
              accept="image/png, image/jpg, image/jpeg"
              {...register("featuredImage", {
                required: !post,
              })}
            />

            <Select
              options={[
                "active",
                "inactive",
              ]}
              label="Status"
              className={`
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-200
                transition
                mb-5
              `}
              {...register("status", {
                required: true,
              })}
            />

                <Button
                type="submit"
                disabled={loading}
                className="
                    w-full
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    py-3
                    rounded-xl
                    text-lg
                    font-semibold
                    transition-all
                    duration-200
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
                >
                {loading
                    ? "Uploading..."
                    : post
                    ? "Update Post"
                    : "Create Post"}
                </Button>
          </div>
        </div>
      </form>
    </>
  );
}