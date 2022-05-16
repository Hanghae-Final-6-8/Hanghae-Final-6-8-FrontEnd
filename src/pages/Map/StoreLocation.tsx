import { useEffect } from 'react';
import useCurrentLocation from './useCurrentPosition';

const StoreLocation = () => {
  const { location, error } = useCurrentLocation();
  useEffect(() => {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('map');
    if (!error) {
      const options = {
        center: new window.kakao.maps.LatLng(
          location?.latitude,
          location?.longitude
        ),
        level: 3,
      };
      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);
      // 장소 검색 객체를 생성합니다
      const ps = new window.kakao.maps.services.Places();

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      const placesSearchCB = (data: any, status: any, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가
          const bounds = new window.kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정
          map.setBounds(bounds);
        }
      };
      console.log(location);
      // 37.3049  127.0626
      ps.keywordSearch('스타벅스', placesSearchCB, {
        radius: 20000,
        location: new window.kakao.maps.LatLng(
          location?.longitude,
          location?.latitude
        ),
      });

      // 지도에 마커를 표시하는 함수
      const displayMarker = (place: any) => {
        // 마커를 생성하고 지도에 표시
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        });

        // 마커에 클릭이벤트를 등록
        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              '</div>'
          );
          infowindow.open(map, marker);
        });
      };

      // 유저 현위치 마커 생성
      // eslint-disable-next-line
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          location?.latitude,
          location?.longitude
        ),
        map: map,
      });
    } else {
      // 유저위치 못가져올 경우 디폴트 지도화면
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      // eslint-disable-next-line
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(33.450701, 126.570667),
        map: map,
      });
    }
  }, [location]);
  return (
    <div>
      <div
        id='map'
        style={{ width: '375px', height: '812px', backgroundColor: 'grey' }}
      >
        지도
      </div>
    </div>
  );
};

export default StoreLocation;
