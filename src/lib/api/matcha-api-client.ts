import { auth } from "@/auth";
import RequestParams from "@/types/api/api-request-params";
import ProblemDetail from "@/types/api/problem-detail";
import { keysToCamelCase, keysToSnakeCase } from "./object-util";

const API_BASE_URL = process.env.NEXT_PUBLIC_MATCHA_API_BASE_URL;

class APIError extends Error {
  public problem: ProblemDetail;
  public status: number;

  constructor(problem: ProblemDetail) {
    super(problem.title);
    this.name = "APIError";
    this.problem = problem;
    this.status = problem.status;
  }
}

async function getAuthHeader(): Promise<HeadersInit> {
  const session = await auth();
  const token = session?.accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function createUrl(endpoint: string, requestParams?: RequestParams) {
  const url = new URL(endpoint, API_BASE_URL);
  if (requestParams === undefined) {
    return url;
  }

  // Append query parameters
  Object.entries(requestParams).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Handle sort being an array of strings
    if (key === "sort" && Array.isArray(value)) {
      value.forEach((sortVal) => {
        url.searchParams.append("sort", sortVal);
      });
    } else {
      url.searchParams.append(key, value.toString());
    }
  });

  return url;
}

async function request<T>(
  method: string,
  endpoint: string,
  queryParams?: RequestParams,
  body?: unknown
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json, application/problem+json",
    ...(await getAuthHeader()),
  };

  const res = await fetch(createUrl(endpoint, queryParams), {
    method,
    headers,
    body: body ? JSON.stringify(keysToSnakeCase(body)) : undefined,
  });

  const contentType = res.headers.get("Content-Type");

  if (!res.ok) {
    if (contentType && contentType.includes("application/problem+json")) {
      const problem: ProblemDetail = await res.json();
      throw new APIError(problem);
    } else if (contentType && contentType.includes("text/plain")) {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    } else {
      throw new Error(`Request failed: ${res.status}`);
    }
  }

  if (res.status === 204) {
    // No Content
    return undefined as T;
  }

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Invalid response content type: ${contentType}`);
  }

  return keysToCamelCase(await res.json());
}

async function get<T>(
  endpoint: string,
  requestParams?: RequestParams
): Promise<T> {
  return request<T>("GET", endpoint, requestParams);
}

async function post<T>(
  endpoint: string,
  data: unknown,
  requestParams?: RequestParams
): Promise<T> {
  return request<T>("POST", endpoint, requestParams, data);
}

async function put<T>(
  endpoint: string,
  data: unknown,
  requestParams?: RequestParams
): Promise<T> {
  return request<T>("PUT", endpoint, requestParams, data);
}

async function del<T>(
  endpoint: string,
  requestParams?: RequestParams
): Promise<T> {
  return request<T>("DELETE", endpoint, requestParams);
}

export { APIError, del, get, post, put };
