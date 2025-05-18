import { StoreType } from "@/interface";
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
                  store?.bizcnd_code_nm
                    ? `/images/mapMarkers/${store?.bizcnd_code_nm}.png`
                    : "/images/mapMarkers/default.png"
                }
                alt="marker"
                width={48}
                height={48}
              />
              <div>
                <div className="text-sm font-semibold leading-9 text-gray-900">
                  {store?.upso_nm}
                </div>
                <div className="text-xs mt-1 truncate font-semibold leading-5 text-gray-500">{store?.tel_no ?? "번호없음"}</div>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-2">
              <div className="text-xs">{store?.rdn_code_nm}</div>
              <div className="text-xs text-gray-500">{store?.crtfc_gbn_nm} | {store?.bizcnd_code_nm}</div>
            </div>
            {/* <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{store.upso_nm}</p>
            <p className="text-sm text-gray-500">{store.cob_code_nm}</p>
          </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/store`
  ).then((res) => res.json());
  return {
    props: { stores },
  };
}
