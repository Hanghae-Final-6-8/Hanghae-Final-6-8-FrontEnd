import { isMobile } from 'react-device-detect';

interface Children {
  children: React.ReactNode;
}

function DeviceDetect({ children }: Children) {
  return isMobile ? <div>{children}</div> : <div>{children}</div>;
}

export default DeviceDetect;
