/**
 * Cross-cutting User entity, authentication state, and role/permission contracts.
 * Synchronized with backend identity schemas and frontend AuthContext.
 */

/**
 * System and custom user roles.
 */
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "TEMPLATE_MANAGER"
  | "USER"
  | (string & {});

/**
 * User account life-cycle status.
 */
export type UserStatus =
  | "ACTIVE"
  | "BLOCKED"
  | "DELETED"
  | "BANNED"
  | (string & {});

/**
 * User avatar image representation.
 */
export interface IUserAvatar {
  id?: string;
  url?: string;
  publicId?: string;
  secureUrl?: string;
  width?: number;
  height?: number;
  format?: string;
}

/**
 * Monetary wallet representation for user credits and purchases.
 */
export interface IUserWallet {
  id?: string;
  balance: number;
  currency?: string;
  credits?: number;
  updatedAt?: string | Date;
}

/**
 * Poster generation credit wallet representation.
 */
export interface IUserCreditWallet {
  id?: string;
  balance: number;
  bonusCredits?: number;
  updatedAt?: string | Date;
}

/**
 * Granular user permission representation.
 */
export interface IUserPermission {
  id?: string;
  key: string;
  name?: string;
  description?: string;
}

/**
 * Role metadata structure associated with a user.
 */
export interface IUserRoleDetails {
  id?: string;
  name: string;
  description?: string;
  isSystem?: boolean;
  permissions?: Array<{
    permission?: IUserPermission;
  }>;
}

/**
 * Role relation item returned from Prisma joins.
 */
export interface IUserRoleRelation {
  role?: IUserRoleDetails;
  name?: string;
}

/**
 * Full User entity contract matching backend Prisma schema and `/api/v1/user/me`.
 */
export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  title?: string | null;
  area?: string | null;
  avatar?: IUserAvatar | string | null;
  avatarAssetId?: string | null;
  userProfile?: string | null;
  status?: UserStatus;
  role?: UserRole;
  roles?: string[] | IUserRoleRelation[];
  roleNames?: string[];
  permissions?: string[];
  hasCreditBypass?: boolean;
  wallet?: IUserWallet | null;
  creditWallet?: IUserCreditWallet | null;
  balance?: number;
  credits?: number;
  totalPosters?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Convenience alias for IUser.
 */
export type User = IUser;

/**
 * Safe user payload omitting sensitive internal data (passwords, salts).
 */
export type SafeUserDto = Omit<IUser, "password" | "salt">;

/**
 * Data transfer object for updating user profile info.
 */
export interface UpdateUserProfileDto {
  name?: string;
  phone?: string;
  title?: string;
  area?: string;
  avatar?: File | Blob | string;
}

/**
 * Active authentication session details.
 */
export interface AuthSession {
  user: IUser;
  token: string;
  refreshToken?: string;
  expiresAt?: number | string;
}

/**
 * Frontend AuthContext state model representing authenticated session & derived permissions.
 */
export interface AuthContextState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  refreshUser: () => Promise<IUser | null>;
  loading: boolean;
  isTemplateManager: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasCreditBypass: boolean;
  canBypassCredits: boolean;
}

