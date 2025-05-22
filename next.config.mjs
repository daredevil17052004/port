/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.aceternity.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'instrurentalss.netlify.app',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'maintainer-next.netlify.app',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  