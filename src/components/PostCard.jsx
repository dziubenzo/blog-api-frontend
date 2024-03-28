import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { convert } from 'html-to-text';

function PostCard({ post }) {
  // Destructure post object into useful variables
  const { title, content, author, create_date, likes, comments, slug } = post;

  return (
    <Link to={`/${slug}`}>
      <div className="post-card">
        <h2 className="title">{title}</h2>
        <p className="content">{convert(content)}</p>
        <p className="author">
          by <span className="author-name">{author}</span>
        </p>
        <p className="created-date">{format(create_date, 'd MMMM y')}</p>
        <div className="likes-and-comments">
          <div className="likes-wrapper">
            <p className="likes-count">{likes}</p>
            <img src="like.svg" alt="Like Icon" />
          </div>
          <div className="comments-wrapper">
            <p className="comments-count">{comments}</p>
            <img src="comments.svg" alt="Comment Icon" />
          </div>
        </div>
      </div>
    </Link>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
