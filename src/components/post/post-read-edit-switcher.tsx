"use client";

import PostApiResponseFullDto from "@/server-actions/post/post-api-response-full-dto";
import { useState } from "react";
import { Button } from "../ui/button";
import PostDetailView from "./post-detail-view";
import SavePostForm from "./save-post-form";

interface Props {
  post: PostApiResponseFullDto;
}

function PostReadEditSwitcher({ post }: Props) {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={toggleEditing}
          variant={editing ? "outline" : "default"}
        >
          {editing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {editing ? (
        <SavePostForm post={post} onSaveSuccess={toggleEditing} />
      ) : (
        <PostDetailView post={post} />
      )}
    </div>
  );
}

export default PostReadEditSwitcher;
