import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='mx-5 my-12'>
      <Outlet />
    </div>
  );
};

export default RootLayout;
