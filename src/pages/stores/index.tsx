import Loading from "@/components/Loading";
import { StoreAPIResponse } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" } = router.query;

  const {
    isError,
    isLoading,
    data: stores,
  } = useQuery({
    queryKey: [`stores-${page}`],
    queryFn: async () => {
      const { data } = await axios(`/api/store?page=${page}`);
      return data as StoreAPIResponse;
    },
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[25%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  console.log(stores);

  return (
    <div className="px-4 md:max-w-5xl mx-auto pb-8 py-20">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.data?.map((store, index) => (
            <li
              key={`store_${index}`}
              className="flex justify-between gap-6 py-3 sm:py-4 items-center"
            >
              <div className="flex gap-x-4">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={
                    store?.category
                      ? `/images/mapMarkers/${store?.category}.png`
                      : "/images/mapMarkers/default.png"
                  }
                  alt="marker"
                  width={48}
                  height={48}
                />
                <div>
                  <div className="text-sm font-semibold leading-9 text-gray-900">
                    {store?.name}
                  </div>
                  <div className="text-xs mt-1 truncate font-semibold leading-5 text-gray-500">
                    {store?.phone ?? "번호없음"}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-2">
                <div className="text-xs">{store?.address}</div>
                <div className="text-xs text-gray-500">
                  {store?.foodCertifyName} | {store?.category}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
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
        {/* {stores?.totalPage && Number(page) + 3 > stores?.totalPage && [...Array()]} */}

        {[...Array(stores?.totalPage)].map((item, index) => {
          const coreIndex = parseInt(page as string) - 1;
          const beforePages = index - 3;
          const afterPages = index + 3;

          if (coreIndex > beforePages && coreIndex < afterPages) {
            return (
              <Link
                key={`page_${index}`}
                href={`/stores?page=${index + 1}`}
                className={`${
                  index + 1 === Number(page)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                } h-10 w-10 flex items-center justify-center rounded-full`}
              >
                {index + 1}
              </Link>
            );
          }
        })}

        {parseInt(page as string) - 3 < 0 &&
          [...Array((parseInt(page as string) - 3) * -1)].map((item, index) => (
            <Link
              key={`page_${Number(page) + index + 3}`}
              href={`/stores?page=${Number(page) + index + 3}`}
              className={`${
                Number(page) + index + 3 === Number(page)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } h-10 w-10 flex items-center justify-center rounded-full`}
            >
              {Number(page) + index + 3}
            </Link>
          ))}

        <button
          className={`h-10 w-10 flex items-center justify-center rounded-full   ${
            page !== String(stores?.totalPage)
              ? "cursor-pointer bg-gray-200"
              : "bg-gray-100 "
          }`}
          onClick={() => {
            router.push(`/stores?page=${Number(page) + 1}`);
          }}
          disabled={page === String(stores?.totalPage)}
        >
          <FiChevronRight
            className={
              page === String(stores?.totalPage)
                ? "text-gray-200"
                : "text-gray-500"
            }
          />
        </button>
        <button
          className={`h-10 w-10 flex items-center justify-center rounded-full   ${
            page !== String(stores?.totalPage)
              ? "cursor-pointer bg-gray-200"
              : "bg-gray-100 "
          }`}
          onClick={() => {
            router.push(`/stores?page=${stores?.totalPage}`);
          }}
          disabled={page === String(stores?.totalPage)}
        >
          <FiChevronsRight
            className={
              page === String(stores?.totalPage)
                ? "text-gray-200"
                : "text-gray-500"
            }
          />
        </button>
      </div>
    </div>
  );
}
