import type { NextConfig } from "next";

/**
 * GitHub Pages deployment.
 *
 * Pages only serves static files, so we use Next's static export (`output: "export"`)
 * which writes a fully static site to `out/` on `next build`.
 *
 * A project site is served from https://<user>.github.io/<repo>/, so every asset
 * must be prefixed with `/<repo>`. That prefix is applied in production builds and
 * can be overridden with the BASE_PATH env var (set BASE_PATH="" for a user page or
 * a custom domain served from the root).
 */
const repo = "viralmafia";

const basePath =
  process.env.BASE_PATH ??
  (process.env.NODE_ENV === "production" ? `/${repo}` : "");

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
