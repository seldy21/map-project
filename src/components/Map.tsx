// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global kakao */

import Script from "next/script";
import { Dispatch, SetStateAction } from "react";

const DEFAULT_LATITUDE = 37.497625203;
const DEFAULT_LONGITUDE = 127.03088379;

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
}

export default function Map({ setMap }: MapProps) {
  const loadKakaoMap = () => {
    window.kakao.maps.load(function () {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          DEFAULT_LATITUDE,
          DEFAULT_LONGITUDE
        ),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      setMap(map);
    });
  };
  return (
    <div>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&libraries=services,clusterer,drawing&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen bg-amber-50"></div>
    </div>
  );
}
