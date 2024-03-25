import { useOutletContext } from 'react-router-dom';
import PostCard from './PostCard';

function Posts() {
  const [posts, comments] = useOutletContext();

  function renderPostCards() {
    return posts.map((post) => {
      // Get comments counts for each post
      const postComments = comments.filter(
        (comment) => comment.post === post._id,
      );
      // Add comments count to post object
      post.comments = postComments.length;
      return <PostCard key={post._id} post={post} />;
    });
  }

  return <div className="posts">{renderPostCards()}</div>;
}

export default Posts;
