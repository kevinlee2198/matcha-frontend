import PostReadEditSwitcher from "@/components/post/post-read-edit-switcher";
import { get } from "@/lib/api/matcha-api-client";
import PostApiResponseFullDto from "@/server-actions/post/post-api-response-full-dto";
import { notFound } from "next/navigation";

interface Params {
  params: { id: string };
}

async function PostDetailPage({ params }: Params) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  const postDetail: PostApiResponseFullDto = await get(`/post/${id}`);

  return <PostReadEditSwitcher post={postDetail} />;
}

export default PostDetailPage;
