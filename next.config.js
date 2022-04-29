/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/product',
        destination: '/product/categories',
        permanent: true,
      },
    ]
  },

}

module.exports = nextConfig
