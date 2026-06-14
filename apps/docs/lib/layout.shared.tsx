import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "unistash",
    },
    githubUrl: "https://github.com/ShobhitPatra/unistash",
    links: [
      { text: "Docs", url: "/docs" },
      { text: "npm", url: "https://www.npmjs.com/package/unistash" },
    ],
  };
}
