import { useEffect } from 'react';

const StoreLocation = () => {
  useEffect(() => {
    // const map = useRef<HTMLDivElement>(null);
    const container = document.getElementById('map');

    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, []);
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
