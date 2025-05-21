import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface PaginationProps {
  totalPage: number;
}

export default function Pagination({ totalPage }: PaginationProps) {
  const router = useRouter();
  const { page = "1" } = router.query;

  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    setPageNumbers([]);
    if (totalPage > 0) {
      let startPage = Number(page) - 2;
      let endPage = Number(page) + 2;
      if (startPage < 1) {
        endPage += 1 - startPage;
        startPage = 1;
      }

      if (endPage > totalPage) {
        const diff = endPage - totalPage;
        startPage = startPage - diff;
        endPage = totalPage;
      }

      for (let i = startPage; i <= endPage; i++) {
        setPageNumbers((pre) => [...pre, i]);
      }
    }
  }, [page, totalPage]);

  return (
    <div className="py-6 w-full px-10 flex justify-center items-center gap-4 bg-white my-10 flex-wrap">
      <button
        className={`h-10 w-10 flex items-center justify-center rounded-full   ${
          page !== "1" ? "cursor-pointer bg-gray-200" : "bg-gray-100 "
        }`}
        onClick={() => {
          router.push(`/stores`);
        }}
        disabled={page === "1"}
      >
        <FiChevronsLeft
          className={page !== "1" ? "text-gray-500" : "text-gray-200"}
        />
      </button>

      <button
        className={`h-10 w-10 flex items-center justify-center rounded-full   ${
          page !== "1" ? "cursor-pointer bg-gray-200" : "bg-gray-100 "
        }`}
        onClick={() => {
          router.push(`/stores?page=${Number(page) - 1}`);
        }}
        disabled={page === "1"}
      >
        <FiChevronLeft
          className={page !== "1" ? "text-gray-500" : "text-gray-200"}
        />
      </button>

      {pageNumbers.map((item) => (
        <Link
          key={`page_${item}`}
          href={`/stores?page=${item}`}
          className={`${
            item === Number(page)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-500"
          } h-10 w-10 flex items-center justify-center rounded-full`}
        >
          {item}
        </Link>
      ))}
      <button
        className={`h-10 w-10 flex items-center justify-center rounded-full   ${
          page !== String(totalPage)
            ? "cursor-pointer bg-gray-200"
            : "bg-gray-100 "
        }`}
        onClick={() => {
          router.push(`/stores?page=${Number(page) + 1}`);
        }}
        disabled={page === String(totalPage)}
      >
        <FiChevronRight
          className={
            page === String(totalPage) ? "text-gray-200" : "text-gray-500"
          }
        />
      </button>
      <button
        className={`h-10 w-10 flex items-center justify-center rounded-full   ${
          page !== String(totalPage)
            ? "cursor-pointer bg-gray-200"
            : "bg-gray-100 "
        }`}
        onClick={() => {
          router.push(`/stores?page=${totalPage}`);
        }}
        disabled={page === String(totalPage)}
      >
        <FiChevronsRight
          className={
            page === String(totalPage) ? "text-gray-200" : "text-gray-500"
          }
        />
      </button>
    </div>
  );
}
