import { Outlet } from 'react-router-dom';

const BeansList = () => {
  return (
    <>
      <div>커피 리스트 페이지 입니다.</div>
      <Outlet />
    </>
  );
};

export default BeansList;
