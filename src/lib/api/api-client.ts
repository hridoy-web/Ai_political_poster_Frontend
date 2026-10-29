export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Fetch function for making backend API calls
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string }> {
  const res = await fetch(`${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`, {
    next: { revalidate: 60 }, 
    ...options,
    credentials: "include", // For sending cookie sessions
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  return res.json();
}
