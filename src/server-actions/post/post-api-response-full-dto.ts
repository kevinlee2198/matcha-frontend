interface PostApiResponseFullDto {
  id: string;
  title: string;
  content: string;
  images?: string[];
  subject: {
    name: string;
    age?: number;
    height?: number;
    location?: string;
    ethnicity?: string;
    occupation?: string;
    college?: string;
  };
}

export default PostApiResponseFullDto;
