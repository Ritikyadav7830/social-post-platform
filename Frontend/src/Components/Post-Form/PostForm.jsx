import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../Index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../../config";

export default function PostForm({ post }) {
    const { register,handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug  || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);


const submitPost = async (data) => {
  try {
    let response;
    
    if (post) {
      // UPDATE
      const formData = new FormData();

formData.append("title", data.title);
formData.append("content", data.content);
formData.append("status", data.status);

if (data.featuredImage?.[0]) {
    formData.append("featuredImage", data.featuredImage[0]);
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
      // CREATE
      const formData = new FormData();

formData.append("title", data.title);
formData.append("slug", data.slug);
formData.append("content", data.content);
formData.append("status", data.status);
formData.append("featuredImage", data.featuredImage[0]);

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
      throw new Error(result.message);
    }

    alert(post ? "Post Updated Successfully" : "Post Created Successfully");
    console.log(post)

    navigate(`/post/${result.data._id}`);
  } catch (error) {
    console.log(error);
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

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <>
     {/* Posts Heading */}
        <div className="mb-4">
            <h2 className="text-4xl font-bold text-gray-900">
                Add Posts
            </h2>
        </div>
        <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>
            <div className="w-1/3 px-2">
            <Input
               label="Featured Image :"
               type="file"
               className="mb-4"
               accept="image/png, image/jpg, image/jpeg"
               {...register("featuredImage", { required: !post })}
             />
                   <Input
                    label="content :"
                    placeholder="content"
                    className="mb-4"
                    {...register("content", { required: true })}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </>
    );
}