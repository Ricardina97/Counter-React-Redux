import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'; //Link that will redirect the user to a single post page
import {PostAuthor} from './PostAuthor';
import {TimeAgo} from './TimeAgo';
import {ReactionButtons} from './ReactionButtons';

export const SinglePostPage = ({ match }) => {
    //match is a prop that contains the URL information, match.params is to extract the id so we can search for it
    const { postId } = match.params

    // UseSelector is a hook that accesses a post with a specific id
    //It's important to note that the component will re-render any time the value returned from useSelector to a new reference

    const post = useSelector(state =>
        state.posts.find(post => post.id === postId)
    )

    //If there are no posts
    if(!post){
        return(
            <section>
                <h2> Post not found</h2>
            </section>
        )
    }
    return(
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <div>
                    <PostAuthor userId={post.user}/>
                    <TimeAgo timestamp={post.date}/>
                </div>
                <p className="post-content">{post.content}</p>
                <ReactionButtons post={post}/>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        </section>
    )
}