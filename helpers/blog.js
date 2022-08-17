import { readdirSync, readFileSync } from "fs";
import { join } from "path";

import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "BlogContent");

export const getPostData = (postIdentifier) => {
  const slug = postIdentifier.replace(/\.md$/, "");
  const filePath = join(postsDirectory, `${slug}.md`);
  const fileContent = readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    slug,
    ...data,
    content,
  };
};

export const getPostsFiles = () => readdirSync(postsDirectory);

export const getAllPosts = () => {
  const postFiles = getPostsFiles();
  const postsData = postFiles.map((file) => getPostData(file));
  return postsData.sort((A, B) => (A.date > B.date ? -1 : 1));
};
