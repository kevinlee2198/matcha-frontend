import { z } from "zod";

const getPostsSchema = z.object({
  offset: z.number().optional(),
  size: z.number().optional(),
  sort: z.string().optional(),
});

const savePostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(256, "Title is too long"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(8196, "Content is too long"),
  company: z.string().min(1, "Please select a company"),
  anonymous: z.boolean(),
});

enum VoteTarget {
  POST = "POST",
  COMMENT = "COMMENT",
}

enum VoteType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

const saveVoteSchema = z.object({
  targetId: z.string(),
  voteTarget: z.enum(VoteTarget),
  voteType: z.enum(VoteType),
});

const deleteVoteSchema = z.object({
  id: z.string(),
});

export {
  deleteVoteSchema,
  getPostsSchema,
  savePostSchema,
  saveVoteSchema,
  VoteTarget,
  VoteType,
};
