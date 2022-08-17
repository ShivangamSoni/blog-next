import { useRouter } from "next/router";

import { getPostData, getPostsFiles } from "../../helpers/blog";

import PostContent from "../../src/Post/PostContent/PostContent";

export default function Home({ post }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PostContent post={post} />
    </>
  );
}

export const getStaticProps = async ({ params: { slug } }) => {
  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};
