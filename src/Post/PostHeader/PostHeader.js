import Image from "next/image";

import styles from "./styles.module.css";

const PostHeader = ({ title, image }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.image}>
        <Image src={image} alt={title} layout="fill" />
      </div>
    </header>
  );
};

export default PostHeader;
