"use server";

import { del, get, post, put } from "@/lib/api/matcha-api-client";
import { Slice } from "@/types/api/page-api-dto";
import { PostApiResponseFullDto } from "@/types/post/post-api-response-dto";
import { VoteApiResponseFullDto } from "@/types/post/vote-api-response-dto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import {
  deleteVoteSchema,
  getPostsSchema,
  savePostSchema,
  saveVoteSchema,
} from "./schema";

async function getPosts(
  values: z.infer<typeof getPostsSchema>
): Promise<Slice<PostApiResponseFullDto>> {
  try {
    return await get("/api/post", {
      size: values.size,
      page: values.offset,
      sort: values.sort,
    });
  } catch (error) {
    console.error("Failed to create post:", error);
    throw new Error("Failed to create post. Please try again.");
  }
}

async function savePost(values: z.infer<typeof savePostSchema>) {
  try {
    const response: PostApiResponseFullDto =
      values.id === undefined
        ? await post("/api/post", values)
        : await put(`/api/post/${values.id}`, values);

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

async function saveVote(values: z.infer<typeof saveVoteSchema>) {
  try {
    const response: VoteApiResponseFullDto = await put("/api/vote", values);
    return response;
  } catch (error) {
    console.error("Failed to vote:", error);
    throw new Error("Failed to vote. Please try again.");
  }
}

async function deleteVote(values: z.infer<typeof deleteVoteSchema>) {
  try {
    const response = await del(`/api/vote/${values.id}`);
    return response;
  } catch (error) {
    console.error("Failed to delete vote:", error);
    throw new Error("Failed to delete vote. Please try again.");
  }
}

export { deleteVote, getPosts, savePost, saveVote };
