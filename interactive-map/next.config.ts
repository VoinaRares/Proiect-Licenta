import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BACKENDAPI: process.env.BACKENDAPI,
  }
};

export default nextConfig;
