import { VoteTarget, VoteType } from "@/server-actions/post/schema";
import { AbstractTimestampEntity } from "../abstract-api-dto-entity";

interface VoteApiResponseSummaryDto extends AbstractTimestampEntity {
  createdBy: string;
  targetId: string;
  voteTarget: VoteTarget;
  voteType: VoteType;
}

interface VoteApiResponseFullDto extends AbstractTimestampEntity {
  targetId: string;
  voteTarget: VoteTarget;
  voteType: VoteType;
}

export type { VoteApiResponseFullDto, VoteApiResponseSummaryDto };
