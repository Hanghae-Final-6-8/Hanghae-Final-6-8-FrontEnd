import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

const CommunityDetail = () => {
  // postsId는 App.tsx에서 라우팅 할때 정한 파라미터명이다.
  const postsId = useParams().postsId;

  const postList = useSelector((store: RootState) => store.community.list);

  const post = postList.find((post) => {
    // url 파라미터는 string으로 넘어와서 형변환 해줘야한다.
    return post.postsId === Number(postsId);
  });

  return (
    <div>
      <span>{post?.nickname}</span>
      <span>{post?.createdAt}</span>
      {post?.tagName.length !== 0 ? (
        post?.tagName.map((tag, idx) => {
          return (
            <span
              className='inline-block bg-lime-800 text-white mr-1 rounded-md text-sm font-bold p-1'
              key={idx}
            >
              {tag}
            </span>
          );
        })
      ) : (
        <></>
      )}
      <p>{post?.title}</p>
      <img src={post?.postsImage} />
      <span>좋아요</span>
      <span>25 개</span>
      <p>{post?.content}</p>
      <hr />
      <input type='text' placeholder='댓글 내용을 입력해주세요' />
      <button>등록</button>
    </div>
  );
};

export default CommunityDetail;
