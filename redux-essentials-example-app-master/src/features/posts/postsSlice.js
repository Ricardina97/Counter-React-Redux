import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = [
    {id: '1', title: 'First Post', content: 'Hello!', date: "2020-07-02T21:52:59.090Z", reactions:{thumbsUp: 0,hooray: 0,heart: 0,rocket: 0,eyes: 0}},
    {id: '2', title: 'Second Post', content: 'More Text', date: "2019-08-02T21:52:59.090Z", reactions:{thumbsUp: 0,hooray: 0,heart: 0,rocket: 0,eyes: 0}}
];

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
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
        },
        reactionAdded(state,action){
            const { postId, reaction } = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }
    }
})

export const {postAdded, postUpdated,reactionAdded} =postSlice.actions;
export default postSlice.reducer;

export const selectAllPosts = state => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId);
