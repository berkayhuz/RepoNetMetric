import type { NextConfig } from "next";
import path from "node:path";
import { getNetMetricImageRemotePatterns } from "../next-image-remote-patterns";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getNetMetricImageRemotePatterns(),
  },
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
