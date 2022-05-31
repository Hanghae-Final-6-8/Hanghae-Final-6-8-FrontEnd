import { $CombinedState } from '@reduxjs/toolkit';

const fileCheck = (file: File) => {
  const maxSize = 8 * 1024 * 1024;
  const imgExtArray = ['gif', 'jpg', 'jpeg', 'png'];

  if (file.size > maxSize) {
    return false;
  }
  const fileExt = file.name.split('.').pop()?.toLocaleLowerCase();
  const result = imgExtArray.find((ext) => {
    return ext === fileExt;
  });
  if (result === undefined) {
    return false;
  }
  return true;
};

export default fileCheck;
