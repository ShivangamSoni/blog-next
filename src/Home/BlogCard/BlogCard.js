import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.css";

const BlogCard = ({ slug, author, title, category, date, image, excerpt }) => {
  return (
    <div className={styles.blogCard}>
      <div className={styles.blogImage}>
        <Image src={image} alt={title} loading="lazy" layout="fill" />
      </div>

      <div className={styles.blogContent}>
        <h2 title={title}>
          <Link href={`/post/${slug}`}>
            <a className={styles.title}>
              {title.split(" ").length > 3
                ? title.split(" ").slice(0, 3).join(" ") + "..."
                : title}
            </a>
          </Link>
        </h2>

        <p className={styles.content}>{excerpt}</p>

        <p className={styles.catDate}>
          <span className={styles.category}>{category}</span> /{" "}
          <span className={styles.creationDate}>{date}</span>
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
