import bg from '../../assets/backgrounds/beans_video.mp4';

const BgVideo = () => {
  return (
    <video
      muted
      autoPlay
      loop
      className='h-full w-full object-cover brightness-bg'
    >
      <source src={bg} type='video/mp4' />
    </video>
  );
};

export default BgVideo;
