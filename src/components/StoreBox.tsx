import { StoreType } from "@/interface";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaCheck, FaInfoCircle, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

interface StoreBoxProps {
  store: StoreType | null;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-xl shadow-lg max-w-md md:max-w-2xl z-10 w-full bg-amber-50">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <Image
                  src={
                    store?.category
                      ? `/images/mapMarkers/${store?.category}.png`
                      : "/images/mapMarkers/default.png"
                  }
                  alt="marker"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold">{store.name}</div>
                  <div>{store.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <IoIosClose className="size-10" />
              </button>
            </div>
           <div className="flex flex-col gap-3 mt-5">
             <div className="flex items-center gap-2">
               <FaLocationDot />
               <div className="text-sm">{store.address}</div>
             </div>
             <div className="flex items-center gap-2">
               <FaPhone />
               <div className="text-sm">{store.phone}</div>
             </div>
             <div className="flex items-center gap-2">
               <FaInfoCircle />
               <div className="text-sm">{store.foodCertifyName}</div>
             </div>
             {store.category && <div className="flex items-center gap-2">
               <FaCheck />
               <div className="text-sm">{store.category}</div>
             </div>}
           </div>
          </div>
          <button className="bg-blue-500 w-full p-4 text-amber-50 cursor-pointer" type="button" onClick={()=>{alert("작업중")}}>상세보기</button>
        </>
      )}
    </div>
  );
}
