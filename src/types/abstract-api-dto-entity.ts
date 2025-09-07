interface AbstractEntity {
  id: string;
}

interface AbstractTimestampEntity extends AbstractEntity {
  // UTC formatting
  createdDate: string;
}

interface UserApiResponseDto extends AbstractEntity {
  displayName: string;
}

interface AbstractCreatedByEntity extends AbstractTimestampEntity {
  createdBy: UserApiResponseDto;
}

interface AbstractVotableEntity extends AbstractCreatedByEntity {
  upvotes: number;
  downvotes: number;
}

export type {
  AbstractCreatedByEntity,
  AbstractEntity,
  AbstractTimestampEntity,
  AbstractVotableEntity,
  UserApiResponseDto,
};
