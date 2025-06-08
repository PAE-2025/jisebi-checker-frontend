"use client";

import {  useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

const Pagination = ({
  totalPage,
  currentPage,
}: {
  totalPage: number;
  currentPage: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageRangeDisplayed = 2;
  const marginPagesDisplayed = 1;

  const handlePageClick = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    const startRange = Math.max(
      marginPagesDisplayed + 1,
      currentPage - Math.floor(pageRangeDisplayed / 2)
    );
    const endRange = Math.min(
      totalPage - marginPagesDisplayed,
      currentPage + Math.floor(pageRangeDisplayed / 2)
    );

    // Left margin
    for (let i = 1; i <= marginPagesDisplayed; i++) {
      pages.push(i);
    }

    if (startRange > marginPagesDisplayed + 1) {
      pages.push("...");
    }

    for (let i = startRange; i <= endRange; i++) {
      pages.push(i);
    }

    if (endRange < totalPage - marginPagesDisplayed) {
      pages.push("...");
    }

    // Right margin
    for (let i = totalPage - marginPagesDisplayed + 1; i <= totalPage; i++) {
      if (i > marginPagesDisplayed && !pages.includes(i)) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex space-x-2 w-fit mx-auto my-4 items-center">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowLeft size={16} />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={"ellipsis" + index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            disabled={currentPage === page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded-md transition ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-blue-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed cursor-pointer`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="rounded-md p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
