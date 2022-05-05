import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
    list:[
        {
        userId:'test',
        userImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
        tag:'일상',
        bgImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
    },
    {
        userId:'test',
        userImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
        tag:'일상',
        bgImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
    },
    {
        userId:'test',
        userImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
        tag:'일상',
        bgImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'
    }
]
}


export const communitySlice = createSlice({
    // 액션명
    name:'communityReducer',
    initialState : INITIAL_STATE,
    reducers:{
        addCommunity:(state,action) => {
            state.push({userId:action.payload.userId,userImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',tag:action.payload.tag,bgImg:'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg'})
        },
        // loadCommunity:(state,action) => {
            
        // }
    }
});

export const {addCommunity} = communitySlice.actions;

export default communitySlice;