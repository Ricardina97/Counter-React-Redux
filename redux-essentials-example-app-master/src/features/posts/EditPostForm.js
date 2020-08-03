import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated, selectPostById } from './postsSlice';

// The Edit Post Form will look similar to Add Post form but the logic is slightly different. It's necessary to retrieve the
// right post object from the store and initialize the state fields in the component so the user can make changes
// It will save the changed title and content values back to the store after the user is done
// The React router will also be used to switch over to the single post page to show that post.
export const EditPostForm = ({ match }) => {
  const { postId } = match.params
  const post = useSelector((state) =>
    selectPostById(state,postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle"> Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent"></label>
        <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
          SavePost
      </button>
    </section>
  )
}
