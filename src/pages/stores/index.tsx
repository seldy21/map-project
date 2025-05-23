import IntersectionObserver from "@/components/IntersectionObserver";
import Loading from "@/components/Loading";
import { StoreType } from "@/interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

export default function StoreListPage() {
  const fetchStores = async ({ pageParam }: { pageParam: number }) => {
    const { data } = await axios(`/api/store?page=${pageParam}`);
    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  console.log(stores);
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
          stores?.pages?.map((page, index) => (
            <React.Fragment key={`store_group_${index}`}>
              {page.data.map((store: StoreType, i: number) => (
                <li
                  key={`store_${index}_${i}`}
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
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
     {(hasNextPage || isFetching) && <IntersectionObserver intersectionAction={fetchNextPage} isLoading={isFetchingNextPage} />}
    </div>
  );
}
