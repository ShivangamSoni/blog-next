import { getAllPosts } from "../helpers/blog";

import PostListing from "../src/Home/PostListing/PostListing";

export default function Home({ posts }) {
  return (
    <>
      <PostListing posts={posts} />
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};
