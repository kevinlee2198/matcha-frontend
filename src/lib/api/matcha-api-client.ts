import { auth } from "@/auth";
import ProblemDetail from "./problem-detail";

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

async function request<T>(
  method: string,
  endpoint: string,
  body?: unknown
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json, application/problem+json",
    ...(await getAuthHeader()),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MATCHA_API_BASE_URL}${endpoint}`,
    {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  const contentType = res.headers.get("Content-Type");

  if (!res.ok) {
    if (contentType && contentType.includes("application/problem+json")) {
      const problem: ProblemDetail = await res.json();
      throw new APIError(problem);
    } else {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }
  }

  if (res.status === 204) {
    // No Content
    return undefined as T;
  }

  return res.json();
}

export async function get<T>(endpoint: string): Promise<T> {
  return request<T>("GET", endpoint);
}

export async function post<T>(endpoint: string, data: unknown): Promise<T> {
  return request<T>("POST", endpoint, data);
}

export async function put<T>(endpoint: string, data: unknown): Promise<T> {
  return request<T>("PUT", endpoint, data);
}

export async function del<T>(endpoint: string): Promise<T> {
  return request<T>("DELETE", endpoint);
}

export { APIError };
