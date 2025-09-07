import { AbstractVotableEntity } from "../abstract-api-dto-entity";
import { VoteApiResponseFullDto } from "./vote-api-response-dto";

interface CommentApiResponseFullDto extends AbstractVotableEntity {
  content: string;
  postId: string;
  userVote?: VoteApiResponseFullDto;
}

export type { CommentApiResponseFullDto };
