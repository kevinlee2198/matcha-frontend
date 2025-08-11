"use server";

import { post, put } from "@/lib/api/matcha-api-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import PostApiResponseFullDto from "./post-api-response-full-dto";
import { savePostSchema } from "./schema";

async function savePost(values: z.infer<typeof savePostSchema>) {
  try {
    const response: PostApiResponseFullDto =
      values.id === undefined
        ? await post("/post", values)
        : await put(`/post/${values.id}`, values);

    const redirectUrl = `/post/${response.id}`;
    if (!values.id) {
      // It's a new post → redirect
      redirect(redirectUrl);
    } else {
      // It's an update → revalidate, then return the post data
      revalidatePath(redirectUrl);
      return response;
    }
  } catch (error) {
    console.error("Failed to create post:", error);
    throw new Error("Failed to create post. Please try again.");
  }
}

export { savePost };
