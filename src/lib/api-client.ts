import { serverURL } from "@/lib/api/authApi";

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  url?: string;
  baseURL?: string;
  params?: Record<string, any> | URLSearchParams;
  data?: any;
  body?: any;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  timeout?: number;
}

export class ApiError extends Error {
  statusCode: number;
  status: number;
  response?: {
    status: number;
    data?: any;
  };
  data?: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.status = statusCode;
    this.data = data;
    this.response = {
      status: statusCode,
      data,
    };
  }
}

class ApiClient {
  private defaultBaseUrl: string;

  constructor() {
    this.defaultBaseUrl = serverURL;
  }

  private resolveUrl(
    endpoint: string,
    baseURL?: string,
    params?: Record<string, any> | URLSearchParams
  ): string {
    const isAbsolute =
      endpoint.startsWith("http://") || endpoint.startsWith("https://");

    const base = (baseURL || this.defaultBaseUrl || "").replace(/\/+$/, "");
    let fullUrl = isAbsolute
      ? endpoint
      : `${base}/${endpoint.replace(/^\/+/, "")}`;

    if (params) {
      const searchParams =
        params instanceof URLSearchParams
          ? new URLSearchParams(params.toString())
          : new URLSearchParams();

      if (!(params instanceof URLSearchParams)) {
        Object.entries(params).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== "") {
            searchParams.append(key, String(val));
          }
        });
      }

      const queryString = searchParams.toString();
      if (queryString) {
        fullUrl += (fullUrl.includes("?") ? "&" : "?") + queryString;
      }
    }

    return fullUrl;
  }

  async request<T = any>(options: RequestOptions & { url: string }): Promise<ApiResponse<T>> {
    const {
      url: endpoint,
      baseURL,
      params,
      data,
      body,
      headers: customHeaders = {},
      method = "GET",
      timeout,
      signal,
      ...customInit
    } = options;

    const fullUrl = this.resolveUrl(endpoint, baseURL, params);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    // Attach Bearer token from localStorage in browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token && !headers["Authorization"] && !headers["authorization"]) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const payload = body !== undefined ? body : data;
    let finalBody: any = undefined;

    if (payload !== undefined && payload !== null) {
      if (payload instanceof FormData) {
        // Let the browser set the boundary header for multipart/form-data
        delete headers["Content-Type"];
        delete headers["content-type"];
        finalBody = payload;
      } else if (typeof payload === "string") {
        finalBody = payload;
      } else {
        finalBody = JSON.stringify(payload);
      }
    }

    let controller: AbortController | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    if (timeout && timeout > 0) {
      controller = new AbortController();
      timeoutId = setTimeout(() => {
        controller?.abort();
      }, timeout);
    }

    const fetchConfig: RequestInit = {
      method,
      credentials: "include", // Cross-domain cookie support
      headers,
      body: finalBody,
      signal: signal || controller?.signal,
      ...customInit,
    };

    try {
      const response = await fetch(fullUrl, fetchConfig);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const contentType = response.headers.get("content-type") || "";
      let responseData: any = null;

      if (contentType.includes("application/json")) {
        try {
          responseData = await response.json();
        } catch {
          responseData = null;
        }
      } else {
        try {
          responseData = await response.text();
        } catch {
          responseData = null;
        }
      }

      if (!response.ok) {
        const errorMsg =
          responseData?.message ||
          (typeof responseData === "string" && responseData) ||
          response.statusText ||
          `Request failed with status ${response.status}`;

        throw new ApiError(errorMsg, response.status, responseData);
      }

      return {
        data: responseData as T,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        ok: response.ok,
      };
    } catch (err: any) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (err instanceof ApiError) {
        throw err;
      }
      const message =
        err?.name === "AbortError"
          ? "Request timed out"
          : err?.message || "Network request failed";
      throw new ApiError(message, err?.status || 500, err);
    }
  }

  get<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>({ ...options, url, method: "GET" });
  }

  post<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...options, url, method: "POST", data });
  }

  put<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...options, url, method: "PUT", data });
  }

  patch<T = any>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...options, url, method: "PATCH", data });
  }

  delete<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>({ ...options, url, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
export default apiClient;

