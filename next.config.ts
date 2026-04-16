import type { NextConfig } from "next";
import path from "node:path";

// MDX content is compiled at runtime via next-mdx-remote (see src/lib/posts.ts),
// so we no longer need @next/mdx's webpack loader or the remark-frontmatter
// plugins in the build pipeline. This keeps the build graph simple and avoids
// Turbopack's fragility with template-literal dynamic imports.
const nextConfig: NextConfig = {
  // Allow the dev server to be reached from 127.0.0.1 in addition to localhost.
  allowedDevOrigins: ["127.0.0.1"],
  // Pin the Turbopack workspace root to this project to avoid picking up the
  // stray lockfile at /Users/shuyu/package-lock.json.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
