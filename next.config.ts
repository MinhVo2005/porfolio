import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  outputFileTracingIncludes: {
    "/**": ["./node_modules/figlet/fonts/**"],
  },
};

export default nextConfig;
