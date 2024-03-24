import { useLoaderData } from 'react-router-dom';

function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <h1>Welcome to Blog API</h1>
    </>
  );
}

export default Posts;
