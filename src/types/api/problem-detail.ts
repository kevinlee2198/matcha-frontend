/**
 * Representation for an RFC 7807 problem detail
 */

interface ProblemDetail {
  status: number; // HTTP status
  type: string; // A URL that identifies the problem type and how to mitigate it. The default value is – about:blank
  title: string; // A short summary of the problem
  detail: string; // Problem explanation specific to this occurrence
  instance: string; // URL of the service where this problem occurred. The default value is the current request URL
}

export default ProblemDetail;
