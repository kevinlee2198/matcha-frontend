"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { createReply, getCommentReplies } from "@/lib/comment-actions";
import { saveVote } from "@/server-actions/post/post-server-actions";
import { VoteTarget, VoteType } from "@/server-actions/post/schema";
import { CommentApiResponseFullDto } from "@/types/post/comment-api-response-dto";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

interface CommentCardProps {
  comment: CommentApiResponseFullDto;
  onReply?: (commentId: string, content: string) => void;
  maxDepth?: number;
}

export function CommentCard({
  comment,
  onReply,
  maxDepth = 3,
}: CommentCardProps) {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [downvotes, setDownvotes] = useState(comment.downvotes);
  const [userVoteType, setUserVoteType] = useState(comment.userVote?.voteType);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [repliesPage, setRepliesPage] = useState(0);
  const [hasMoreReplies, setHasMoreReplies] = useState(false);

  async function handleVote(voteType: VoteType) {
    // Remove the vote w/o and set everything back to not liked
    if (userVoteType === voteType) {
      // todo - can't use the post?userVote?.id - need api endpoint for target type + id
      // deleteVote()
      setUserVoteType((prevVoteType) => {
        if (prevVoteType === VoteType.UPVOTE) {
          setUpvotes((prevUpvoteCount) => prevUpvoteCount - 1);
        } else if (prevVoteType === VoteType.DOWNVOTE) {
          setDownvotes((prevDownvoteCount) => prevDownvoteCount - 1);
        }
        return undefined;
      });
    } else {
      saveVote({
        targetId: comment.id,
        voteTarget: VoteTarget.POST,
        voteType,
      });
      setUserVoteType((prevVoteType) => {
        if (prevVoteType === VoteType.UPVOTE) {
          setUpvotes((prevUpvoteCount) => prevUpvoteCount - 1);
        } else if (prevVoteType === VoteType.DOWNVOTE) {
          setDownvotes((prevDownvoteCount) => prevDownvoteCount - 1);
        }

        if (voteType === VoteType.UPVOTE) {
          setUpvotes((prevUpvoteCount) => prevUpvoteCount + 1);
        } else if (voteType === VoteType.DOWNVOTE) {
          setDownvotes((prevDownvoteCount) => prevDownvoteCount + 1);
        }

        return voteType;
      });
    }
  }

  async function handleReply() {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await createReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
      onReply?.(comment.id, replyContent);
      // Refresh replies if they're currently shown
      if (showReplies) {
        loadReplies(0, true);
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function loadReplies(page = 0, reset = false) {
    setLoadingReplies(true);
    try {
      const repliesData = await getCommentReplies(comment.id, page);
      if (reset) {
        setReplies(repliesData.content);
      } else {
        setReplies((prev) => [...prev, ...repliesData.content]);
      }
      setHasMoreReplies(!repliesData.last);
      setRepliesPage(page);
      setShowReplies(true);
    } catch (error) {
      console.error("Error loading replies:", error);
    } finally {
      setLoadingReplies(false);
    }
  }

  const handleShowReplies = () => {
    if (!showReplies && replies.length === 0) {
      loadReplies(0, true);
    } else {
      setShowReplies(!showReplies);
    }
  };

  const handleLoadMoreReplies = () => {
    loadReplies(repliesPage + 1, false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const canReply = comment.depth < maxDepth;

  return (
    <div
      className={`${
        comment.depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""
      }`}
    >
      <div className="flex space-x-3 group">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="text-xs bg-muted">
            {getInitials(comment.author)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-card rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-foreground">
                  {comment.createdBy.displayName}
                </span>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {comment.createdDate}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report Comment</DropdownMenuItem>
                  <DropdownMenuItem>Hide Comment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-foreground leading-relaxed text-pretty">
              {comment.content}
            </p>

            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(VoteType.UPVOTE)}
                  className={`h-7 px-2 text-xs transition-colors ${
                    userVoteType === VoteType.UPVOTE
                      ? "text-green-500 hover:text-green-600"
                      : "text-muted-foreground hover:text-green-500"
                  }`}
                >
                  <ChevronUp
                    className={`h-3 w-3 ${
                      userVoteType === VoteType.UPVOTE ? "fill-current" : ""
                    }`}
                  />
                  {upvotes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(VoteType.DOWNVOTE)}
                  className={`h-7 px-2 text-xs transition-colors ${
                    userVoteType === VoteType.DOWNVOTE
                      ? "text-red-500 hover:text-red-600"
                      : "text-muted-foreground hover:text-red-500"
                  }`}
                >
                  <ChevronDown
                    className={`h-3 w-3 ${
                      userVoteType === VoteType.DOWNVOTE ? "fill-current" : ""
                    }`}
                  />
                  {downvotes}
                </Button>
              </div>

              {canReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}

              {comment.depth === 0 &&
                (comment.replyCount > 0 || replies.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShowReplies}
                    disabled={loadingReplies}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {loadingReplies
                      ? "Loading..."
                      : showReplies
                      ? "Hide Replies"
                      : `See Replies (${comment.replyCount || replies.length})`}
                  </Button>
                )}
            </div>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3 ml-3">
              <div className="flex space-x-2">
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    You
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[60px] text-sm resize-none"
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      size="sm"
                      onClick={handleReply}
                      disabled={isSubmitting || !replyContent.trim()}
                    >
                      {isSubmitting ? "Posting..." : "Reply"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReplyForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showReplies && replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {replies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  maxDepth={maxDepth}
                />
              ))}
              {hasMoreReplies && (
                <div className="ml-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLoadMoreReplies}
                    disabled={loadingReplies}
                    className="text-xs text-muted-foreground hover:text-primary"
                  >
                    {loadingReplies ? "Loading..." : "Load More Replies"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
