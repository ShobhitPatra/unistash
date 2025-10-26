import { createMDX } from "fumadocs-mdx/next";
import rehypePrettyCode from "rehype-pretty-code";

const withMDX = createMDX({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true,
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withMDX(config);
