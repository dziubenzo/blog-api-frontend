import { useOutletContext, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Comment from './Comment';

function Post() {
  // Get post slug
  const { postSlug } = useParams();
  const [posts, comments] = useOutletContext();
  // Get post
  const [post] = posts.filter((post) => post.slug === postSlug);
  // Destructure post
  const { title, content, author, create_date, likes } = post;
  // Get post comments
  const postComments = comments.filter((comment) => {
    return comment.post == post._id;
  });

  function renderComments() {
    return postComments.map((comment) => {
      return <Comment key={comment._id} comment={comment} />;
    });
  }

  return (
    <div className="post-wrapper">
      <div className="post-info-wrapper">
        <div className="like-post">
          <img src="likes.svg" alt="Like Icon - Post" />
        </div>
        <div className="post-info">
          <p className="post-author">{author}</p>
          <p className="post-date">
            {formatDistanceToNow(create_date, { addSuffix: true })}
          </p>
          <p className="post-likes">
            {likes} {likes === 1 ? 'like' : 'likes'}
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
