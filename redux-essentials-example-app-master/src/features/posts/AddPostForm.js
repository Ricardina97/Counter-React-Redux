import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';

export const AddPostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const onSavePostClicked = () => {
        if(title && content){
            dispatch(
                // Since we prepared a payload on postSlice class, the postAdded doesn't need to worry about what the
                // payload looks like
                postAdded(title,content,userId)
            )

            setTitle('')
            setContent('')
        }
    }

    // Adding logic to the save button so that the user can only press the button if the title and content have actual text
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    // Searching for the user and displaying their name
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return(
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent"></label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}