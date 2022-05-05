import React from "react";
import {useSelector} from 'react-redux';


const Community = () => {

	const communityList = useSelector((store) => store.community.list);

	console.log(communityList);
	console.log(typeof(communityList));
	return (
		<div>
			<div>커뮤니티</div>
			{/* <div>
				<img className="h-14 w-14" src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg"/>
				<span>userName</span>
				<span>일상</span>
				<div className="h-52 w-52 bg-gradient-to-r from-cyan-500 to-indigo-500">이미지</div>
			</div> */}
			{Array.from(communityList,(community,index) => {
				return (
				<div key={index}>
					<img className="h-14 w-14" src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg"/>
					<span>{community.userId}</span>
					<span>{community.tag}</span>
					<div className="h-52 w-52 bg-gradient-to-r from-cyan-500 to-indigo-500">이미지</div>
				</div>
				)
			})}
		</div>
	);
};

export default Community;
