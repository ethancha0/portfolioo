/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: new URL("./", import.meta.url).pathname,
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(avif|gif|jpe?g|mov|mp4|png|svg|webm)$/i,
      type: "asset/resource",
    })

    return config
  },
}

export default nextConfig
