import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ["upload.wikimedia.org"], 
  },
  async redirects() {
    return [
      {
        source: "/",       
        destination: "/ar",
        permanent: true,   
      },
    ];
  },
};

export default nextConfig;
