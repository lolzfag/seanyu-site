import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Allow the dev server to be reached from 127.0.0.1 in addition to localhost.
  allowedDevOrigins: ["127.0.0.1"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // Turbopack requires plugins to be referenced by string (not function import),
    // and plugin options to be serializable (plain JSON — no functions).
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
  },
});

export default withMDX(nextConfig);
