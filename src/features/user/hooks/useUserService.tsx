import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  UserQueryParams,
} from "../service/service";
import {
  User,
  UserDetailResponse,
  UserListResponse,
  CreateUserPayload,
  UpdateUserPayload,
  DeleteUserResponse,
  UserMutationResponse,
} from "../types";

import { useRouter } from "nextjs-toploader/app";

export const useUserService = ({
  id,
  params,
}: {
  id?: string;
  params?: UserQueryParams;
} = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Query daftar user
  const usersQuery = useQuery<UserListResponse, Error>({
    queryKey: ["users", params],
    queryFn: () => getUsers(params || {}),
    enabled: !!params,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  // Query user detail
  const userQuery = useQuery<UserDetailResponse, Error>({
    queryKey: ["user", id],
    queryFn: () => getUser(id as string),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  // Create user
  const createMutation = useMutation<
    UserMutationResponse,
    Error,
    CreateUserPayload
  >({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.refetchQueries({ queryKey: ["users"] });
      router.back();
    },
  });

  // Update user
  const updateMutation = useMutation<
    UserMutationResponse,
    Error,
    { id: string; payload: UpdateUserPayload }
  >({
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["user", id] });
      await queryClient.refetchQueries({ queryKey: ["users"] });
      router.back();
    },
  });

  // Delete user
  const deleteMutation = useMutation<DeleteUserResponse, Error, string>({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.refetchQueries({ queryKey: ["users"] });
    },
  });

  return {
    // List
    users: usersQuery.data,
    isLoadingUsers: usersQuery.isLoading,
    usersError: usersQuery.error,

    // Detail
    user: userQuery.data,
    isLoadingUser: userQuery.isLoading,
    userError: userQuery.error,

    // Create
    createUser: createMutation.mutate,
    createUserAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,

    // Update
    updateUser: updateMutation.mutate,
    updateUserAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,

    // Delete
    deleteUser: deleteMutation.mutate,
    deleteUserAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
};
