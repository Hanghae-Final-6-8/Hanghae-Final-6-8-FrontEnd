import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  // 리덕스에서 커뮤니티 리스트 가져옴
  const communityList = useSelector((store) => store.community.list);

  const handleMoveToWritePage = () => {
    navigate('/community/write');
  };

  const handleMoveToDetailPage = () => {
    navigate(`/community/test123`);
  };

  return (
    <div>
      <div>커뮤니티</div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {communityList.map((commu, idx) => {
          return (
            <div key={idx}>
              <img
                className='h-14 w-14'
                src='https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
              />
              <span>{commu.userId}</span>
              <span>{commu.tag}</span>
              <div
                className='h-40 w-40 bg-gradient-to-r from-cyan-500 to-indigo-500'
                onClick={handleMoveToDetailPage}
              >
                이미지
              </div>
            </div>
          );
        })}
      </div>

      <button
        style={{
          fontSize: '5rem',
          backgroundColor: 'pink',
          height: '5rem',
          width: '5rem',
          lineHeight: '5rem',
          borderRadius: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
        onClick={handleMoveToWritePage}
      >
        +
      </button>
    </div>
  );
};

export default Community;
