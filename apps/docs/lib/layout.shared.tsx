import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ThemeToggle } from "@/components/ThemeToggle";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "unistash",
    },
    githubUrl: "https://github.com/ShobhitPatra/unistash",
    links: [
      { text: "docs", url: "/docs" },
      { text: "npm", url: "https://www.npmjs.com/package/unistash" },
    ],
    themeSwitch: {
      component: <ThemeToggle />,
    },
  };
}
