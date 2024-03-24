import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ postsCount, commentsCount }) {
  return (
    <>
      <div className="posts-count">
        <p>Posts</p>
        <span>{postsCount}</span>
      </div>
      <div className="app-name">
        <Link to="/">Blog API</Link>
      </div>
      <div className="comments-count">
        <p>Comments</p>
        <span>{commentsCount}</span>
      </div>
    </>
  );
}

Header.propTypes = {
  postsCount: PropTypes.number,
  commentsCount: PropTypes.number,
};

export default Header;
