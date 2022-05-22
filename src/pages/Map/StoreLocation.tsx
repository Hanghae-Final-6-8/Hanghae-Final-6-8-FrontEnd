import { useEffect } from 'react';
import useCurrentLocation from '../../utils/useCurrentPosition';
import { useParams } from 'react-router-dom';

const StoreLocation = () => {
  const cafeName = useParams().cafeName;
  const { location, error } = useCurrentLocation();
  // 마커를 클릭하면 장소명을 표출할 인포윈도우
  const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

  useEffect(() => {
    const container = document.getElementById('map');
    /////
    let markers: any = [];

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
      // 장소 검색 객체를 생성
      const ps = new window.kakao.maps.services.Places();

      // 키워드 검색 완료 시 호출되는 콜백함수
      const placesSearchCB = (data: any, status: any, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출

          displayPlaces(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('주변 20km내에 매장이 없습니다.');
          return;
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
        }
      };

      ps.keywordSearch(cafeName, placesSearchCB, {
        // 반지름 m단위
        radius: 10000,
        location: new window.kakao.maps.LatLng(
          location?.latitude,
          location?.longitude
        ),
      });

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      const displayPlaces = (places: any) => {
        const listEl = document.getElementById('placesList'),
          menuEl = document.getElementById('menu_wrap'),
          fragment = document.createDocumentFragment(),
          bounds = new window.kakao.maps.LatLngBounds();

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (let i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          const placePosition = new window.kakao.maps.LatLng(
              places[i].y,
              places[i].x
            ),
            marker = addMarker(
              placePosition,
              i,
              places[i].place_name,
              places[i].place_url
            ),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          (function (marker, title) {
            itemEl.onmouseover = function () {
              displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
              infowindow.close();
            };
          })(marker, places[i].place_name);
          fragment.appendChild(itemEl);
          listEl?.appendChild(itemEl);
        }
        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl?.appendChild(fragment);
        menuEl!.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      };

      // 검색결과 항목을 Element로 반환하는 함수입니다
      const getListItem = (index: any, places: any) => {
        // eslint-disable-next-line prefer-const
        let el = document.createElement('li'),
          itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            '   <a href="' +
            places.place_url +
            '" target="_blank">' +
            places.place_name +
            '</a>';

        el.style.marginBottom = '10px';
        el.style.borderBottom = '1px solid #e5e5e5';
        el.style.padding = '15px';

        if (places.road_address_name) {
          itemStr +=
            '    <span style="color:grey;font-size:14px">' +
            places.road_address_name +
            '</span>' +
            '   <span class="jibun gray" style="color:grey;font-size:14px">' +
            places.address_name +
            '</span>';
        } else {
          itemStr +=
            '    <span style="color:grey;font-size:14px">' +
            places.address_name +
            '</span>';
        }

        itemStr +=
          '  <span class="tel" style="color:grey;font-size:14px">' +
          places.phone +
          '</span>' +
          '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
      };

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      const addMarker = (
        position: any,
        idx: any,
        title: string,
        url: string
      ) => {
        const imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new window.kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        // 마커 클릭 이벤트 부분
        const iwContent =
            '<div style="padding:25px;">' +
            title +
            '<br><a href="' +
            url +
            '" style="color:blue;" target="_blank">링크 바로가기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwPosition = new window.kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

        // 인포윈도우에 닫기 x버튼 추가
        const iwRemoveable = true;

        // 인포윈도우를 생성합니다
        const infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
          removable: iwRemoveable,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        // infowindow.open(map, marker);

        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
        });

        // 마커 클립 이벤트 부분 end

        return marker;
      };

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      const removeMarker = () => {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      };

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      const displayInfowindow = (marker: any, title: any) => {
        const content =
          '<div style="padding:5px;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
      };

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      const removeAllChildNods = (el: any) => {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
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
    <div style={{ position: 'relative' }}>
      <div
        id='map'
        style={{ width: '375px', height: '812px', backgroundColor: 'grey' }}
      >
        지도
      </div>

      <div
        id='menu_wrap'
        className='bg_white no-scrollbar'
        style={{
          position: 'absolute',
          bottom: '0',
          zIndex: '1000',
          width: '375px',
          height: '320px',
          overflowY: 'auto',
          backgroundColor: 'rgba(255,255,255,1)',
          color: '#111',
          padding: '20px 15px',
          borderTopLeftRadius: '10%',
          borderTopRightRadius: '10%',
        }}
      >
        <div>
          <div>
            {/* <p style={{ fontWeight: 'bold' }}>USER님 주변에 있는</p> */}
            <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              <span style={{ color: '#964B00' }}>{cafeName}</span> 매장 정보예요
            </p>
          </div>
          <hr className='mb-5' />
          <ul id='placesList'>목록</ul>
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;
