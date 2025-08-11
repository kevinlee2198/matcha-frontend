"use server";

import { post } from "@/lib/api/matcha-api-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import PostApiResponseFullDto from "./post-api-response-full-dto";
import { createPostSchema } from "./schema";

async function createPost(values: z.infer<typeof createPostSchema>) {
  try {
    const response: PostApiResponseFullDto = await post("/post", values);

    const redirectUrl = `/post/${response.id}`;
    revalidatePath(redirectUrl);
    redirect(redirectUrl);
  } catch (error) {
    console.error("Failed to create post:", error);
    throw new Error("Failed to create post. Please try again.");
  }
}

export { createPost };
