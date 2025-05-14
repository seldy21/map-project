/* global kakao */

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  // kakao map 로드
  const loadKakaoMap = () => {}
  return (
      <div id="map" className="w-full h-screen">Map index page</div>
  );
}
