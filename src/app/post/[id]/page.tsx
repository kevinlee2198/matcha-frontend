import { auth } from "@/auth";
import PostDetail from "@/components/post/post-detail";
import { get } from "@/lib/api/matcha-api-client";
import { Slice } from "@/types/api/page-api-dto";
import { CommentApiResponseFullDto } from "@/types/post/comment-api-response-dto";
import { PostApiResponseFullDto } from "@/types/post/post-api-response-dto";
import { notFound } from "next/navigation";

interface Params {
  params: { id: string };
}

async function PostDetailPage({ params }: Params) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  const session = await auth();
  const postDetail: PostApiResponseFullDto = await get(`/api/post/${id}`);
  const comments: Slice<CommentApiResponseFullDto> = await get(
    `/api/comment/post/${id}`
  );

  return <PostDetail post={postDetail} comments={comments} session={session} />;
}

export default PostDetailPage;
