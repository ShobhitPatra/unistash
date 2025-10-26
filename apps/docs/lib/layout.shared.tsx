import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { url } from "inspector";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Unistash",
    },
    githubUrl: "https://github.com/ShobhitPatra/unistash",
    links: [
      {
        text: "Docs",
        url: "/docs",
      },
      {
        text: "Examples",
        url: "/docs/examples/zustand",
      },
    ],
  };
}
