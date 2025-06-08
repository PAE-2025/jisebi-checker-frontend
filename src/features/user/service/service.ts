import { createApi } from "@/lib/api";
import {
  CreateUserPayload,
  DeleteUserResponse,
  UpdateUserPayload,
  UserDetailResponse,
  UserListResponse,
  UserMutationResponse,
} from "../types";
// Query params untuk list user
export interface UserQueryParams {
  page?: number;
  limit?: number;
  username?: string;
}
export function removeEmptyParams<T extends Record<string, any>>(obj: T): T {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  });
  return obj;
}

const api = await createApi(process.env.NEXT_PUBLIC_AUTH_SERVICE ?? "");

// GET /api/users – List users
export const getUsers = async (
  params: UserQueryParams
): Promise<UserListResponse> => {
  const cleanedParams = removeEmptyParams({
    ...params,
    limit: params.limit || 10,
  });
  try {
    const res = await api.get<UserListResponse>(`/users`, {
      params: cleanedParams,
    });
    return res.data;
  } catch (error: any) {
    console.error("GET USERS ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.error || "Gagal mengambil daftar pengguna."
    );
  }
};

// POST /api/users – Create user
export const createUser = async (
  payload: CreateUserPayload
): Promise<UserMutationResponse> => {
  try {
    const res = await api.post(`/users`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Gagal membuat pengguna.";
    console.error("CREATE USER ERROR:", errorMessage);
    throw new Error(errorMessage);
  }
};

// GET /api/users/:id – Get user detail
export const getUser = async (id: string): Promise<UserDetailResponse> => {
  try {
    const res = await api.get<UserDetailResponse>(`/users/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("GET USER ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.error || "Gagal mengambil detail pengguna."
    );
  }
};

// PUT /api/users/:id – Update user
export const updateUser = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateUserPayload;
}): Promise<UserMutationResponse> => {
  const cleanedPayload = removeEmptyParams({
    ...payload,
  });
  console.log(cleanedPayload);
  try {
    const res = await api.put(`/users/${id}`, cleanedPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    console.error("UPDATE USER ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.message || "Gagal memperbarui pengguna."
    );
  }
};

// DELETE /api/users/:id – Delete user
export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (error: any) {
    console.error("DELETE USER ERROR:", error?.response?.data);
    throw new Error(
      error?.response?.data?.error || "Gagal menghapus pengguna."
    );
  }
};
