import { useOutletContext, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Comment from './Comment';
import { useState } from 'react';
import {
  addPostToLocalStorage,
  checkIfPostLiked,
  removePostFromLocalStorage,
} from '../helpers';

function Post() {
  // Get post slug
  const { postSlug } = useParams();
  const [posts, comments] = useOutletContext();
  // Get post
  const [post] = posts.filter((post) => post.slug === postSlug);
  // Destructure post
  const { title, content, author, create_date } = post;
  // Get post comments
  const postComments = comments.filter((comment) => {
    return comment.post == post._id;
  });

  // State for updating post likes count dynamically
  const [postLikes, setPostLikes] = useState(post.likes);
  // State for determining whether or not the post is already liked
  const [isPostLiked, setIsPostLiked] = useState(checkIfPostLiked(post._id));
  // State for disabling Like/Unlike button until after the component is rerendered
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Render all comments
  function renderComments() {
    return postComments.map((comment) => {
      return <Comment key={comment._id} comment={comment} />;
    });
  }

  // Like post
  async function likePost(event) {
    event.preventDefault();
    try {
      // Disable button
      setIsButtonDisabled(true);
      await fetch(`http://localhost:3000/posts/${post._id}/like`, {
        method: 'PUT',
      });
      // Update both state and the posts object so that the main page is in sync without refresh
      setPostLikes(postLikes + 1);
      post.likes++;
      // Update localStorage and state
      addPostToLocalStorage(post._id);
      setIsPostLiked(true);
      setIsButtonDisabled(false);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Unlike post
  async function unlikePost(event) {
    event.preventDefault();
    try {
      // Disable button
      setIsButtonDisabled(true);
      await fetch(`http://localhost:3000/posts/${post._id}/unlike`, {
        method: 'PUT',
      });
      // Update both state and the posts object so that the main page is in sync without refresh
      setPostLikes(postLikes - 1);
      post.likes--;
      // Update localStorage and state
      removePostFromLocalStorage(post._id);
      setIsPostLiked(false);
      setIsButtonDisabled(false);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="post-wrapper">
      <div className="post-info-wrapper">
        <div className="like-post">
          <form method="post" onSubmit={isPostLiked ? unlikePost : likePost}>
            <button type="submit" disabled={isButtonDisabled}>
              <img
                src={isPostLiked ? 'liked.svg' : 'likes.svg'}
                alt={isPostLiked ? 'Unlike Icon - Post' : 'Like Icon - Post'}
              />
            </button>
          </form>
        </div>
        <div className="post-info">
          <p className="post-author">{author}</p>
          <p className="post-date">
            {formatDistanceToNow(create_date, { addSuffix: true })}
          </p>
          <p className="post-likes">
            {postLikes} {postLikes === 1 ? 'like' : 'likes'}
          </p>
        </div>
      </div>
      <div className="post">
        <h1>{title}</h1>
        <div className="content">{content}</div>
      </div>
      <div className="comments">
        {postComments.length ? (
          <h2>Comments ({postComments.length})</h2>
        ) : (
          <h2>Be the first to comment!</h2>
        )}
        {renderComments()}
      </div>
    </div>
  );
}

export default Post;
