import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { hostname } from 'os';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, 'src/sass')],
    prependData: `@import "main.sass"`,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.shopify.com',
      },
    ],
  },
};

export default nextConfig;
