import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import axios from "axios";
import { useState } from "react";

declare global {
  interface Window {
    kakao: {
      maps: any; // Replace 'any' with specific types if available
    };
  }
}

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState<any>(null);
  const storeDatas = stores as StoreType[];

  const [currentStore, setCurrentStore] = useState(null);

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        stores={storeDatas}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}api/store`);

  return {
    props: { stores : stores.data },
    revalidate: 60 * 60,
  };
}
