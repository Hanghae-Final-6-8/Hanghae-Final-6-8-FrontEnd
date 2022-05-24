import bg from '../../assets/backgrounds/beans_video.mp4';

const BgWeb = () => {
  return (
    <video muted autoPlay loop className='h-full object-cover brightness-bg'>
      <source src={bg} type='video/mp4' />
    </video>
  );
};

export default BgWeb;
