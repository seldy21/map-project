import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { StoreAPIResponse } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

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
      <Pagination totalPage={stores?.totalPage ?? 0}/>
    </div>
  );
}
