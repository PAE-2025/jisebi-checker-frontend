"use client";
import StatusBadge from "@/components/badges/StatusBadge";
import MainButton from "@/components/buttons/MainButton";
import DeleteModal from "@/components/modal/DeleteModal";
import Pagination from "@/components/table/Pagination";
import { Column, Table } from "@/components/table/Table";
import { useUserService } from "@/features/user/hooks/useUserService";
import { User } from "@/features/user/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserTable({}: {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const rowsPerPage = 10;

  const {
    isLoadingUsers: isLoading,
    users: data,
    usersError: error,
    deleteUserAsync,
    isDeleting,
  } = useUserService({
    params: {
      page: currentPage,
      limit: rowsPerPage,
    },
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (row: User) => {
    setSelectedUser(row);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUserAsync(selectedUser._id);
        setIsModalOpen(false);
        setSelectedUser(null);
        toast.success(`User ${selectedUser.username} deleted`);
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      }
    }
  };

  const columns: Column<User>[] = [
    {
      key: "username",
      label: "Username",
      sortable: true,
    },
    {
      key: "isAdmin",
      label: "Role",
      render: (_: any, row: User) =>
        row.isAdmin ? (
          <StatusBadge status="info">Admin</StatusBadge>
        ) : (
          <StatusBadge status="neutral">User</StatusBadge>
        ),
    },
  ];

  return (
    <>
      <div className="px-4 py-4 md:px-8 md:py-8 lg:px-12 lg:py-16 xl:px-16 xl:py-20">
        <h1 className="text-xl font-bold mb-4">User</h1>
        <MainButton
          onClick={() => router.push("/user/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Add User
        </MainButton>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Gagal memuat data</p>
        ) : (
          <Table<User>
            columns={columns}
            data={data?.data.users}
            isLoading={isLoading}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onView={(row) => router.push(`/user/${row._id}`)}
            onEdit={(row) => router.push(`/user/${row._id}/edit`)}
            onDelete={handleDeleteClick}
          />
        )}
        <Pagination
          totalPage={data?.data.pagination.page || 1}
          currentPage={currentPage}
        />
      </div>

      {isModalOpen && selectedUser && (
        <DeleteModal
          title={`Delete ${selectedUser.username}`}
          item={selectedUser.username}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onDelete={confirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
