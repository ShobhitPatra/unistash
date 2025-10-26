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
        text: "Documentation",
        url: "/docs",
      },
      {
        text: "Examples",
        url: "https://github.com/ShobhitPatra/unistash/tree/master/examples",
      },
    ],
  };
}
