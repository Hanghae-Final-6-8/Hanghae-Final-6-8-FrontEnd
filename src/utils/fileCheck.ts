import { $CombinedState } from '@reduxjs/toolkit';

const fileCheck = (file: File) => {
  const maxSize = 8 * 1024 * 1024;
  const imgExtArray = [
    'gif',
    'jpg',
    'jpeg',
    'png',
    'webp',
    'tiff',
    'exif',
    'svg',
    'pct',
    'pic',
  ];

  if (file.size > maxSize) {
    alert('8MB이하의 이미지 파일을 선택해주세요');
    return false;
  }
  const fileExt = file.name.split('.').pop()?.toLocaleLowerCase();
  const result = imgExtArray.find((ext) => {
    return ext === fileExt;
  });

  if (result === undefined) {
    alert('지원하지않는 파일입니다.');
    return false;
  }
  return true;
};

export default fileCheck;
