// Role tidak disebutkan di dokumentasi, jadi diasumsikan hanya admin dan non-admin

export interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

// Response untuk daftar user dengan pagination
export interface UserListResponse {
  status: string;
  message: string;
  data: {
    users: User[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

// Response untuk detail user
export interface UserDetailResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
}

// Payload untuk membuat user baru
export interface CreateUserPayload {
  username: string;
  password: string;
  isAdmin?: boolean; // default false jika tidak dikirim
}

// Payload untuk update user
export interface UpdateUserPayload {
  username?: string;
  password?: string;
  isAdmin?: boolean;
}

// Response setelah membuat atau mengupdate user
export interface UserMutationResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
}

// Response setelah menghapus user
export interface DeleteUserResponse {
  status: string;
  message: string;
  data: null;
}
