import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Заменяем устаревший domains на remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.apsod.com',
        port: '',
        pathname: '/**',
      },
      // Добавьте другие домены если нужно
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    // Пустая конфигурация для подавления ошибки
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
})(nextConfig);