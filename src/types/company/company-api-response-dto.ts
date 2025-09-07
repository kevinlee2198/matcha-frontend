import { AbstractEntity } from "../abstract-api-dto-entity";

interface CompanyApiResponseFullDto extends AbstractEntity {
  name: string;
}

interface CompanyApiResponseSummaryDto extends AbstractEntity {
  name: string;
}

export type { CompanyApiResponseFullDto, CompanyApiResponseSummaryDto };
