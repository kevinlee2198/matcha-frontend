interface RequestParams {
  page?: number;
  size?: number;
  sort?: string | string[];
  [key: string]: unknown;
}

export default RequestParams;
