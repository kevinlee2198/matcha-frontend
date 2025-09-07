import { AbstractVotableEntity } from "../abstract-api-dto-entity";
import { CompanyApiResponseSummaryDto } from "../company/company-api-response-dto";
import { VoteApiResponseFullDto } from "./vote-api-response-dto";

interface PostApiResponseFullDto extends AbstractVotableEntity {
  title: string;
  content: string;
  company: CompanyApiResponseSummaryDto;

  images?: string[];
  userVote?: VoteApiResponseFullDto;
}

export type { PostApiResponseFullDto };
