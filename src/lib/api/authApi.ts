export const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

interface ApiEndpoint {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

interface AuthApiType {
  register: ApiEndpoint;
  login: ApiEndpoint;
  googleLogin: ApiEndpoint;
  logout: ApiEndpoint;
  getCurrentUser: ApiEndpoint;
}

const authApi: AuthApiType = {
  register: {
    url: "/api/v1/auth/register",
    method: "POST",
  },
  login: {
    url: "/api/v1/auth/login",
    method: "POST",
  },
  googleLogin: {
    url: "/api/v1/auth/google",
    method: "POST",
  },
  logout: {
    url: "/api/v1/auth/logout",
    method: "POST",
  },
  getCurrentUser: {
    url: "/api/v1/user/me",
    method: "GET",
  },
};

export default authApi;
