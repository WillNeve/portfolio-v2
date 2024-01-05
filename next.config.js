/** @type {import('next').NextConfig} */

const path = require('path')

const sassOptions = {
  includePaths: [path.join(__dirname, 'styles')],
}

const nextConfig = {
  sassOptions,
  reactStrictMode: true,
  env: {
    customKey: 'my-value',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = nextConfig
