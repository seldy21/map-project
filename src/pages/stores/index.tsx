import { StoreType } from "@/interface";
import axios from "axios";
import Image from "next/image";

export default function StoreListPage({ stores }: { stores: StoreType[] }) {
  return (
    <div className="px-4 md:max-w-5xl mx-auto pb-8 py-20">
      <ul role="list" className="divide-y divide-gray-100">
        {stores.map((store, index) => (
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
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/store`);
  return {
    props: { stores : stores.data },
  };
}
