"use client";
import { Column, Table } from "@/components/table/Table";
import React from "react";

type FileItem = {
  link: string;
  author: string;
  tanggal: string;
};

const dummyData: FileItem[] = [
  {
    link: "https://example.com/file1.pdf",
    author: "John Doe",
    tanggal: "2025-05-08",
  },
  {
    link: "https://example.com/file2.pdf",
    author: "Jane Smith",
    tanggal: "2025-05-07",
  },
];

const columns: Column<FileItem>[] = [
  {
    key: "link",
    label: "File",
    render: (value: string) => (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Abc.pdf
      </a>
    ),
  },
  { key: "author", label: "Author" },
  { key: "tanggal", label: "Tanggal Upload" },
];

export default function FileTablePage() {
  const handleView = (row: FileItem) => {
    alert(`View: ${row.link}`);
  };

  const handleEdit = (row: FileItem) => {
    alert(`Edit: ${row.link}`);
  };

  const handleDelete = (row: FileItem) => {
    alert(`Delete: ${row.link}`);
  };

  return (
    <div className="px-16 py-20">
      <h1 className="text-xl font-bold mb-4">History</h1>
      <Table<FileItem>
        columns={columns}
        data={dummyData}
        currentPage={1}
        rowsPerPage={10}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
