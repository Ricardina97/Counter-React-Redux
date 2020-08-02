import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = [
    {id: '1', title: 'First Post', content: 'Hello!'},
    {id: '2', title: 'Second Post', content: 'More Text'}
];

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded(state,action) {
            state.push(action.payload);
        },
        prepare(title, content){
            return {
                payload: {
                    id: nanoid(),
                    title,
                    content
                }
            }
        },
        postUpdated(state,action){
            //Get from action.payload the id, title and content of post
            const { id, title, content } = action.payload;
            // From the action payload we'll find the post related to the id extracted
            const existingPost = state.find(post => post.id === id);
            if(existingPost){
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    }
})

export const {postAdded, postUpdated} =postSlice.actions;
export default postSlice.reducer;