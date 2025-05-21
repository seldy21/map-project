import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkersProps {
  map: any; // Replace 'any' with specific types if available
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  stores,
  setCurrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    stores?.map((store) => {
      const imageSrc = store.category
        ? `/images/mapMarkers/${store.category}.png`
        : "/images/mapMarkers/default.png"; // 마커이미지
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      //식당 데이터 마커 위치
      const markerPosition = new window.kakao.maps.LatLng(
        store.latitude,
        store.longitude
      );

      //식당 데이터 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map);

      //마커에 마우스 오버시 정보창 생성
      const content = `<div class="infoWindow">${store?.name}</div>`; //인포 윈도우에 표시될 내용

      // 커스텀 오버레이를 생성합니다
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content: content,
        xAnchor: 0.6,
        yAnchor: 0.4,
      });

      // 마커에 mouseover 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        customOverlay.setMap(map);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        customOverlay.setMap(null);
      });

      //선택한 가게 저장
      window.kakao.maps.event.addListener(marker, "click", function () {
        setCurrentStore(store);
      });
    });
  },[map, setCurrentStore, stores]);
  useEffect(() => {
    if (map) {
      loadKakaoMarkers();
    }
  }, [map, loadKakaoMarkers]);
  return <></>;
}
