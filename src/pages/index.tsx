import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import * as stores from "@/data/storeData.json";
import { StoreType } from "@/interface";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: {
      maps: any; // Replace 'any' with specific types if available
    };
  }
}

export default function Home() {
  const [map, setMap] = useState<any>(null);
  const storeDatas = stores.DATA as StoreType[];

  const [currentStore, setCurrentStore] = useState(null);

  useEffect(() => {
    console.log("currentStore", currentStore);
  }, [currentStore]);
  return (
    <>
    <Map setMap={setMap}/>
    <Markers storeDatas={storeDatas} map={map} setCurrentStore={setCurrentStore}/>
    <StoreBox store={currentStore} setStore={setCurrentStore}/>
    </>
  );
}
