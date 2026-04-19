import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js >= 15 blocks cross-origin requests by default in dev mode for security.
  // We add your local network IPs here so you can test on other devices.
  allowedDevOrigins: [
    "10.12.41.51",
    "192.168.236.1"
  ],
};

export default nextConfig;
