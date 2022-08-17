import Image from "next/image";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import PostHeader from "../PostHeader/PostHeader";

import styles from "./styles.module.css";

const customComponents = {
  img({ src, alt }) {
    return (
      <div className={styles.image}>
        <Image src={src} alt={alt} layout="fill" />
      </div>
    );
  },
  p({ node, children }) {
    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      return (
        <div className={styles.image}>
          <Image src={image.properties.src} alt={image.alt} layout="fill" />
        </div>
      );
    } else {
      return <p>{children}</p>;
    }
  },
  a({ href, children }) {
    if (href[0] === "/") {
      return (
        <Link href={href} passHref>
          <a>{children}</a>
        </Link>
      );
    } else {
      return (
        <a href={href} target="_new">
          {children}
        </a>
      );
    }
  },
};

const PostContent = ({ post }) => {
  const { title, image, content } = post;

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={image} />
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
