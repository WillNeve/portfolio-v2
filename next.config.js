/** @type {import('next').NextConfig} */

const path = require('path')

const sassOptions = {
  includePaths: [path.join(__dirname, 'styles')],
}

const nextConfig = {
  sassOptions,
  reactStrictMode: false,
}

module.exports = nextConfig
