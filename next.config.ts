import type { NextConfig } from "next";

/**
 * GitHub Pages deployment (custom domain: viralvalley.io).
 *
 * Pages only serves static files, so we use Next's static export (`output: "export"`)
 * which writes a fully static site to `out/` on `next build`.
 *
 * The site is served from the custom domain ROOT (https://viralvalley.io/), so there
 * is no path prefix. (If you ever serve from the bare https://<user>.github.io/<repo>/
 * URL instead, build with BASE_PATH=/viralmafia.)
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // assets live under the same /<repo> prefix on Pages
  assetPrefix: basePath || undefined,
  // map routes to folder/index.html so static hosts resolve them
  trailingSlash: true,
  // no image optimization server on Pages
  images: { unoptimized: true },
};

export default nextConfig;
