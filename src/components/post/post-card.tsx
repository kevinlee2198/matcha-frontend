"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { saveVote } from "@/server-actions/post/post-server-actions";
import { VoteTarget, VoteType } from "@/server-actions/post/schema";
import { PostApiResponseFullDto } from "@/types/post/post-api-response-dto";
import {
  Clock,
  Heart,
  MoreHorizontal,
  ThumbsDown,
  TrendingUp,
} from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  post: PostApiResponseFullDto;
  session: Session | null;
}

function PostCard({ post, session }: Props) {
  const router = useRouter();
  const [userVoteType, setUserVoteType] = useState(post.userVote?.voteType);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(post.downvotes);

  async function handleVote(voteType: VoteType) {
    // Remove the vote w/o and set everything back to not liked
    if (userVoteType === voteType) {
      // todo - can't use the post?userVote?.id - need api endpoint for target type + id
      // deleteVote()
      setUserVoteType((prevVoteType) => {
        if (prevVoteType === VoteType.UPVOTE) {
          setUpvoteCount((prevUpvoteCount) => prevUpvoteCount - 1);
        } else if (prevVoteType === VoteType.DOWNVOTE) {
          setDownvoteCount((prevDownvoteCount) => prevDownvoteCount - 1);
        }
        return undefined;
      });
    } else {
      saveVote({
        targetId: post.id,
        voteTarget: VoteTarget.POST,
        voteType,
      });
      setUserVoteType((prevVoteType) => {
        if (prevVoteType === VoteType.UPVOTE) {
          setUpvoteCount((prevUpvoteCount) => prevUpvoteCount - 1);
        } else if (prevVoteType === VoteType.DOWNVOTE) {
          setDownvoteCount((prevDownvoteCount) => prevDownvoteCount - 1);
        }

        if (voteType === VoteType.UPVOTE) {
          setUpvoteCount((prevUpvoteCount) => prevUpvoteCount + 1);
        } else if (voteType === VoteType.DOWNVOTE) {
          setDownvoteCount((prevDownvoteCount) => prevDownvoteCount + 1);
        }

        return voteType;
      });
    }
  }

  const handleCardClick = () => {
    router.push(`/post/${post.id}`);
  };

  const formatTimestamp = (timestamp: string) => {
    // Simple timestamp formatting - in real app, use a library like date-fns
    return timestamp;
  };

  return (
    <Card
      className="hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs font-medium">
                {post.company.name}
              </Badge>
              {post.upvotes >= 100 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl text-balance leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report Post</DropdownMenuItem>
              <DropdownMenuItem>Hide Post</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="text-pretty leading-relaxed">
          {post.content}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatTimestamp(post.createdDate)}
            </span>
            <span>by {post.createdBy.displayName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(VoteType.UPVOTE)}
              className={`transition-colors ${
                userVoteType === VoteType.UPVOTE
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground hover:text-red-500"
              }`}
              title={!session ? "Sign in to vote on posts" : ""}
            >
              <Heart
                className={`h-4 w-4 mr-1 ${
                  userVoteType === VoteType.UPVOTE ? "fill-current" : ""
                }`}
              />
              {upvoteCount}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(VoteType.DOWNVOTE)}
              className={`transition-colors ${
                userVoteType === VoteType.DOWNVOTE
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground hover:text-red-500"
              }`}
              title={!session ? "Sign in to vote on posts" : ""}
            >
              <ThumbsDown
                className={`h-4 w-4 mr-1 ${
                  userVoteType === VoteType.DOWNVOTE ? "fill-current" : ""
                }`}
              />
              {downvoteCount}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
