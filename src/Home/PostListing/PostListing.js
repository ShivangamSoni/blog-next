import BlogCard from "../BlogCard/BlogCard";

import styles from "./styles.module.css";

const PostListing = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
    </div>
  );
};

export default PostListing;
