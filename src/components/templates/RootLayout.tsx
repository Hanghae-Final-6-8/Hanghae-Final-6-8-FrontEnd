import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='px-5 py-12 h-full'>
      <Outlet />
    </div>
  );
};

export default RootLayout;
