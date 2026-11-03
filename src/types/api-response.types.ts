/**
 * Cross-cutting API response, pagination, and error contract types.
 * Aligns frontend transport layer with backend standard payload schemas.
 */

/**
 * Standard metadata for paginated API responses.
 */
export interface PaginationMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

/**
 * Field-level validation error details returned by backend validation middleware.
 */
export interface ApiErrorSource {
  field?: string;
  path?: string | (string | number)[];
  message: string;
  code?: string;
  val?: unknown;
}

/**
 * Normalized API error detail structure.
 */
export interface ApiErrorDetail {
  field?: string;
  message: string;
  code?: string;
  target?: unknown;
}

/**
 * Standard error response envelope returned by backend `error.middleware.ts`.
 */
export interface ApiErrorResponse {
  success: false;
  statusCode?: number;
  message: string;
  errors?: Array<ApiErrorSource | string>;
  errorDetails?: string;
  stack?: string;
}

/**
 * Backend API response envelope format produced by `sendResponse.ts`.
 *
 * @template T - The payload data type.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: unknown;
  meta?: PaginationMeta;
}

/**
 * Alias for backend API response envelope for explicit backend payload typing.
 */
export type BackendApiResponse<T = unknown> = ApiResponse<T>;

/**
 * Type-narrowed success response ensuring success is true and data is defined.
 */
export interface ApiSuccessResponse<T> extends ApiResponse<T> {
  success: true;
  data: T;
}

/**
 * Client-side HTTP transport response wrapper returned by `apiClient.request()`.
 *
 * @template T - The parsed response body type (typically ApiResponse<Payload>).
 */
export interface ClientApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

/**
 * Supported HTTP methods for API requests.
 */
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

/**
 * Supported query parameter structures for client requests.
 */
export type QueryParams =
  | Record<string, string | number | boolean | null | undefined>
  | URLSearchParams;

/**
 * Unified request configuration options for native fetch client.
 */
export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  url?: string;
  baseURL?: string;
  params?: QueryParams;
  data?: unknown;
  body?: unknown;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  timeout?: number;
}

