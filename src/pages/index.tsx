// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global kakao */

import Script from "next/script";

declare global {
  interface Window {
    kakao: {
      maps: any; // Replace 'any' with specific types if available
    };
  }
}

export default function Home() {
  const loadKakaoMap = () => {
    window.kakao.maps.load(function () {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(container, options);
    });
  };
  return (
    <>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&libraries=services,clusterer,drawing&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen bg-amber-50"></div>
    </>
  );
}
