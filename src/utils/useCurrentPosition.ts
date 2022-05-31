import { useState, useEffect, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface LatLonType {
  latitude: number;
  longitude: number;
}

const useCurrentLocation = (options = {}) => {
  const navigate = useNavigate();
  // location 정보 저장
  const [location, setLocation] = useState<LatLonType>();
  // 에러 메세지 저장
  const [error, setError] = useState('');

  // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Geolocation의 `getCurrentPosition` 메소드에 대한 실패 callback 핸들러
  const handleError = (error: { message: SetStateAction<string> }) => {
    setError(error.message);
    alert('설정에서 위치를 허용해 주세요');
    navigate(-1);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    // Geolocation API 호출
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, []);

  return { location, error };
};

export default useCurrentLocation;
