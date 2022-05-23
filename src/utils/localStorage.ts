export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// 배열이나 객체는 JSON.stringify(), JSON.parse()를 이용해야 합니다.

export const setObjLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getObjLocalStorage = (key: string) => {
  const storageValue = localStorage.getItem(key) as any;
  return JSON.parse(storageValue);
};
