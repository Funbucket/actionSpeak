/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'abmmugiauteczjxbhemo.supabase.co',
        protocol: 'https',
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
