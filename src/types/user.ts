/**
 * JUERP - User Types
 *
 * File:
 * src/types/user.ts
 *
 * Purpose:
 * - Shared user/customer TypeScript types for JUONE.
 * - Represents authentication identity, user profile, contact details,
 *   addresses, preferences and API responses.
 *
 * IMPORTANT:
 * - Firebase Authentication is authoritative for authentication identity.
 * - Firestore/backend is authoritative for application profile data.
 * - Do not store passwords, OTPs or authentication secrets in these types.
 * - Admin authorization must be enforced by backend/custom claims and
 *   Firestore security rules.
 */

/* -------------------------------------------------------------------------- */
/* User Status                                                                */
/* -------------------------------------------------------------------------- */

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED";

/* -------------------------------------------------------------------------- */
/* User Role                                                                  */
/* -------------------------------------------------------------------------- */

export type UserRole =
  | "USER";

/* -------------------------------------------------------------------------- */
/* User Gender                                                                */
/* -------------------------------------------------------------------------- */

export type UserGender =
  | "MALE"
  | "FEMALE"
  | "OTHER"
  | "PREFER_NOT_TO_SAY";

/* -------------------------------------------------------------------------- */
/* User Address Type                                                          */
/* -------------------------------------------------------------------------- */

export type UserAddressType =
  | "HOME"
  | "WORK"
  | "OTHER";

/* -------------------------------------------------------------------------- */
/* User Address                                                               */
/* -------------------------------------------------------------------------- */

export interface UserAddress {
  addressId: string;

  userId: string;

  type?: UserAddressType;

  label?: string;

  name?: string;

  phone?: string;

  addressLine1: string;

  addressLine2?: string;

  landmark?: string;

  city?: string;

  district?: string;

  state?: string;

  postalCode?: string;

  country?: string;

  latitude?: number;

  longitude?: number;

  isDefault?: boolean;

  createdAt?:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* User Preferences                                                           */
/* -------------------------------------------------------------------------- */

export interface UserPreferences {
  language?: string;

  notificationsEnabled?: boolean;

  pushNotificationsEnabled?: boolean;

  emailNotificationsEnabled?: boolean;

  smsNotificationsEnabled?: boolean;

  marketingNotificationsEnabled?: boolean;

  locationSharingEnabled?: boolean;

  darkMode?: boolean;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* User Contact Information                                                   */
/* -------------------------------------------------------------------------- */

export interface UserContact {
  email?: string;

  phoneNumber?: string;

  phoneNumberVerified?: boolean;

  emailVerified?: boolean;
}

/* -------------------------------------------------------------------------- */
/* User Profile                                                               */
/* -------------------------------------------------------------------------- */

export interface UserProfile {
  userId: string;

  firstName?: string;

  lastName?: string;

  displayName?: string;

  photoUrl?: string;

  dateOfBirth?: string;

  gender?: UserGender;

  contact?: UserContact;

  addresses?: UserAddress[];

  preferences?: UserPreferences;

  createdAt?:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* User                                                                       */
/* -------------------------------------------------------------------------- */

export interface User {
  /**
   * Canonical Firebase/application user ID.
   */
  userId: string;

  /**
   * Firebase Authentication UID.
   *
   * In the normal JUONE authentication flow this corresponds
   * to the authenticated Firebase user.
   */
  uid?: string;

  role: UserRole;

  status: UserStatus;

  contact?: UserContact;

  profile?: UserProfile;

  addresses?: UserAddress[];

  preferences?: UserPreferences;

  /**
   * Backend/application timestamps.
   */
  createdAt?:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;

  lastLoginAt?:
    | string
    | number
    | Date;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* User Summary                                                               */
/* -------------------------------------------------------------------------- */

export interface UserSummary {
  userId: string;

  displayName?: string;

  email?: string;

  phoneNumber?: string;

  status: UserStatus;

  role: UserRole;

  photoUrl?: string;

  createdAt?:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;
}

/* -------------------------------------------------------------------------- */
/* User Query                                                                 */
/* -------------------------------------------------------------------------- */

export interface UserQuery {
  userId?: string;

  uid?: string;

  email?: string;

  phoneNumber?: string;

  status?: UserStatus;

  statuses?: UserStatus[];

  role?: UserRole;

  search?: string;

  city?: string;

  district?: string;

  state?: string;

  page?: number;

  pageSize?: number;

  fromDate?: string;

  toDate?: string;
}

/* -------------------------------------------------------------------------- */
/* User Pagination                                                            */
/* -------------------------------------------------------------------------- */

export interface UserPagination {
  page: number;

  pageSize: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

/* -------------------------------------------------------------------------- */
/* User List Response                                                         */
/* -------------------------------------------------------------------------- */

export interface UserListResponse {
  users: UserSummary[];

  pagination?: UserPagination;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Detail Response                                                       */
/* -------------------------------------------------------------------------- */

export interface UserDetailResponse {
  user: User;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Registration Input                                                    */
/* -------------------------------------------------------------------------- */

export interface UserRegistrationInput {
  email: string;

  phoneNumber?: string;

  firstName?: string;

  lastName?: string;

  displayName?: string;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Profile Update Input                                                  */
/* -------------------------------------------------------------------------- */

export interface UserProfileUpdateInput {
  userId: string;

  firstName?: string;

  lastName?: string;

  displayName?: string;

  photoUrl?: string;

  dateOfBirth?: string;

  gender?: UserGender;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Contact Update Input                                                  */
/* -------------------------------------------------------------------------- */

export interface UserContactUpdateInput {
  userId: string;

  email?: string;

  phoneNumber?: string;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Address Input                                                         */
/* -------------------------------------------------------------------------- */

export interface UserAddressInput {
  userId: string;

  type?: UserAddressType;

  label?: string;

  name?: string;

  phone?: string;

  addressLine1: string;

  addressLine2?: string;

  landmark?: string;

  city?: string;

  district?: string;

  state?: string;

  postalCode?: string;

  country?: string;

  latitude?: number;

  longitude?: number;

  isDefault?: boolean;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Address Update Input                                                  */
/* -------------------------------------------------------------------------- */

export interface UserAddressUpdateInput {
  userId: string;

  addressId: string;

  type?: UserAddressType;

  label?: string;

  name?: string;

  phone?: string;

  addressLine1?: string;

  addressLine2?: string;

  landmark?: string;

  city?: string;

  district?: string;

  state?: string;

  postalCode?: string;

  country?: string;

  latitude?: number;

  longitude?: number;

  isDefault?: boolean;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Preferences Update Input                                              */
/* -------------------------------------------------------------------------- */

export interface UserPreferencesUpdateInput {
  userId: string;

  language?: string;

  notificationsEnabled?: boolean;

  pushNotificationsEnabled?: boolean;

  emailNotificationsEnabled?: boolean;

  smsNotificationsEnabled?: boolean;

  marketingNotificationsEnabled?: boolean;

  locationSharingEnabled?: boolean;

  darkMode?: boolean;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Mutation Response                                                     */
/* -------------------------------------------------------------------------- */

export interface UserMutationResponse {
  success: boolean;

  userId?: string;

  addressId?: string;

  message?: string;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* User Status Update                                                         */
/* -------------------------------------------------------------------------- */

export interface UserStatusUpdateInput {
  userId: string;

  status: UserStatus;

  reason?: string;

  correlationId: string;

  idempotencyKey?: string;
}

/* -------------------------------------------------------------------------- */
/* User Status Update Response                                                */
/* -------------------------------------------------------------------------- */

export interface UserStatusUpdateResponse {
  success: boolean;

  userId: string;

  previousStatus?: UserStatus;

  currentStatus?: UserStatus;

  message?: string;

  correlationId: string;
}

/* -------------------------------------------------------------------------- */
/* User Constants                                                             */
/* -------------------------------------------------------------------------- */

export const USER_STATUSES:
  readonly UserStatus[] = [
  "ACTIVE",
  "INACTIVE",
  "BLOCKED",
];

export const USER_ROLES:
  readonly UserRole[] = [
  "USER",
];

export const USER_GENDERS:
  readonly UserGender[] = [
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
];

export const USER_ADDRESS_TYPES:
  readonly UserAddressType[] = [
  "HOME",
  "WORK",
  "OTHER",
];

/* -------------------------------------------------------------------------- */
/* Labels                                                                     */
/* -------------------------------------------------------------------------- */

export const USER_STATUS_LABELS:
  Record<UserStatus, string> = {
  ACTIVE: "Active",

  INACTIVE: "Inactive",

  BLOCKED: "Blocked",
};

export const USER_ROLE_LABELS:
  Record<UserRole, string> = {
  USER: "User",
};

export const USER_GENDER_LABELS:
  Record<UserGender, string> = {
  MALE: "Male",

  FEMALE: "Female",

  OTHER: "Other",

  PREFER_NOT_TO_SAY: "Prefer not to say",
};

export const USER_ADDRESS_TYPE_LABELS:
  Record<UserAddressType, string> = {
  HOME: "Home",

  WORK: "Work",

  OTHER: "Other",
};

/* -------------------------------------------------------------------------- */
/* Type Guards                                                                */
/* -------------------------------------------------------------------------- */

export function isUserStatus(
  value: unknown,
): value is UserStatus {
  return (
    value === "ACTIVE" ||
    value === "INACTIVE" ||
    value === "BLOCKED"
  );
}

export function isUserRole(
  value: unknown,
): value is UserRole {
  return value === "USER";
}

export function isUserGender(
  value: unknown,
): value is UserGender {
  return (
    value === "MALE" ||
    value === "FEMALE" ||
    value === "OTHER" ||
    value === "PREFER_NOT_TO_SAY"
  );
}

export function isUserAddressType(
  value: unknown,
): value is UserAddressType {
  return (
    value === "HOME" ||
    value === "WORK" ||
    value === "OTHER"
  );
}

/* -------------------------------------------------------------------------- */
/* User Helpers                                                               */
/* -------------------------------------------------------------------------- */

export function getUserDisplayName(
  user: User | UserSummary,
): string {
  if (
    "profile" in user &&
    user.profile?.displayName
  ) {
    return user.profile.displayName;
  }

  if (
    "profile" in user
  ) {
    const firstName =
      user.profile?.firstName ?? "";

    const lastName =
      user.profile?.lastName ?? "";

    const fullName =
      `${firstName} ${lastName}`.trim();

    if (fullName) {
      return fullName;
    }
  }

  if (
    "displayName" in user &&
    user.displayName
  ) {
    return user.displayName;
  }

  return "User";
}

export function getUserEmail(
  user: User | UserSummary,
): string | null {
  if (
    "contact" in user &&
    user.contact?.email
  ) {
    return user.contact.email;
  }

  if (
    "email" in user &&
    user.email
  ) {
    return user.email;
  }

  return null;
}

export function getUserPhoneNumber(
  user: User | UserSummary,
): string | null {
  if (
    "contact" in user &&
    user.contact?.phoneNumber
  ) {
    return user.contact.phoneNumber;
  }

  if (
    "phoneNumber" in user &&
    user.phoneNumber
  ) {
    return user.phoneNumber;
  }

  return null;
}

export function isActiveUser(
  user: User | UserSummary,
): boolean {
  return user.status === "ACTIVE";
}

export function isBlockedUser(
  user: User | UserSummary,
): boolean {
  return user.status === "BLOCKED";
}

/* -------------------------------------------------------------------------- */
/* Address Helpers                                                            */
/* -------------------------------------------------------------------------- */

export function getDefaultUserAddress(
  user: User,
): UserAddress | null {
  const addresses =
    user.addresses ??
    user.profile?.addresses ??
    [];

  return (
    addresses.find(
      (address) =>
        address.isDefault === true,
    ) ?? null
  );
}

export function findUserAddress(
  user: User,
  addressId: string,
): UserAddress | null {
  const addresses =
    user.addresses ??
    user.profile?.addresses ??
    [];

  return (
    addresses.find(
      (address) =>
        address.addressId ===
        addressId,
    ) ?? null
  );
}

/* -------------------------------------------------------------------------- */
/* Verification Helpers                                                       */
/* -------------------------------------------------------------------------- */

export function isUserEmailVerified(
  user: User,
): boolean {
  return (
    user.contact
      ?.emailVerified === true
  );
}

export function isUserPhoneVerified(
  user: User,
): boolean {
  return (
    user.contact
      ?.phoneNumberVerified === true
  );
}

/* -------------------------------------------------------------------------- */
/* Correlation Helper                                                         */
/* -------------------------------------------------------------------------- */

export function hasUserCorrelationId(
  value: {
    correlationId?: string;
  },
): boolean {
  return (
    typeof value.correlationId ===
      "string" &&
    value.correlationId.trim()
      .length > 0
  );
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const userTypes = {
  USER_STATUSES,

  USER_ROLES,

  USER_GENDERS,

  USER_ADDRESS_TYPES,

  USER_STATUS_LABELS,

  USER_ROLE_LABELS,

  USER_GENDER_LABELS,

  USER_ADDRESS_TYPE_LABELS,

  isUserStatus,

  isUserRole,

  isUserGender,

  isUserAddressType,

  getUserDisplayName,

  getUserEmail,

  getUserPhoneNumber,

  isActiveUser,

  isBlockedUser,

  getDefaultUserAddress,

  findUserAddress,

  isUserEmailVerified,

  isUserPhoneVerified,

  hasUserCorrelationId,
};

export default userTypes;