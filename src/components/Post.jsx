import { useOutletContext, useParams } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import Comment from './Comment';
import { useState } from 'react';
import {
  addElementToLocalStorage,
  checkIfElementLiked,
  removeElementFromLocalStorage,
} from '../helpers';
import CommentForm from './CommentForm';
import parse from 'html-react-parser';

function Post() {
  // Get post slug
  const { postSlug } = useParams();
  const { posts, setPosts, comments, setComments } = useOutletContext();
  // Get post
  const [post] = posts.filter((post) => post.slug === postSlug);
  // Destructure post
  const { title, content, author, create_date, update_date, likes } = post;
  // Get post comments
  const postComments = comments.filter((comment) => {
    return comment.post == post._id;
  });

  // State for determining whether or not the post is already liked
  const [isPostLiked, setIsPostLiked] = useState(
    checkIfElementLiked(post._id, 'likedPosts'),
  );
  // State for disabling Like/Unlike button until after the component is rerendered
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Render all comments
  function renderComments() {
    return postComments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          comment={comment}
          comments={comments}
          setComments={setComments}
        />
      );
    });
  }

  // Like post
  async function likePost(event) {
    event.preventDefault();
    try {
      // Disable button
      setIsButtonDisabled(true);
      const res = await fetch(`http://localhost:3000/posts/${post._id}/like`, {
        method: 'PUT',
      });
      if (!res.ok) {
        throw new Error('Server error');
      }
      // Update posts state without mutation
      setPosts(
        posts.map((element) => {
          if (element._id === post._id) {
            return { ...element, likes: element.likes + 1 };
          } else {
            return element;
          }
        }),
      );
      // Update localStorage and state
      addElementToLocalStorage(post._id, 'likedPosts');
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
      const res = await fetch(
        `http://localhost:3000/posts/${post._id}/unlike`,
        {
          method: 'PUT',
        },
      );
      if (!res.ok) {
        throw new Error('Server error');
      }
      // Update posts state without mutation
      setPosts(
        posts.map((element) => {
          if (element._id === post._id) {
            return { ...element, likes: element.likes - 1 };
          } else {
            return element;
          }
        }),
      );
      // Update localStorage and state
      removeElementFromLocalStorage(post._id, 'likedPosts');
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
                src={isPostLiked ? 'liked.svg' : 'like.svg'}
                alt={isPostLiked ? 'Unlike Icon - Post' : 'Like Icon - Post'}
              />
            </button>
          </form>
        </div>
        <div className="post-info">
          <p className="post-author">{author}</p>
          <p>{format(create_date, 'd MMMM y')}</p>
          <p title={format(update_date, 'd MMMM y')}>
            edited
            <span>
              {' ' + formatDistanceToNow(update_date, { addSuffix: true })}
            </span>
          </p>
          <p className="post-likes">
            {likes} {likes === 1 ? 'like' : 'likes'}
          </p>
        </div>
      </div>
      <div className="post">
        <h1 className="post-title">{title}</h1>
        <div className="content">{parse(content)}</div>
      </div>
      <div className="comments">
        <h2 className="comments-heading">
          {postComments.length
            ? `Comments (${postComments.length})`
            : 'Be the first to comment!'}
        </h2>
        {renderComments()}
      </div>
      <div className="comment-form">
        <CommentForm
          postId={post._id}
          comments={comments}
          setComments={setComments}
        />
      </div>
    </div>
  );
}

export default Post;
