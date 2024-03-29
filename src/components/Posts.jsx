import { useOutletContext } from 'react-router-dom';
import PostCard from './PostCard';

function Posts() {
  const { posts, comments } = useOutletContext();

  function renderPostCards() {
    return posts.map((post) => {
      // Show only published posts
      if (!post.published) {
        return;
      }
      // Get comments counts for each post
      const postComments = comments.filter(
        (comment) => comment.post === post._id,
      );
      // Add comments count to post object
      post.comments = postComments.length;
      return <PostCard key={post._id} post={post} />;
    });
  }

  return (
    <>
      {!posts.length ? (
        <>
          <h2 className="no-posts-message">No posts.</h2>
          <h2 className="no-posts-message">That&apos;s bad!</h2>
        </>
      ) : (
        <div className="posts">{renderPostCards()}</div>
      )}
    </>
  );
}

export default Posts;
