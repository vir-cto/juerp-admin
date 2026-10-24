/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Keep Next.js from trying to treat the project as a
   * monorepo/workspace when an unrelated package-lock.json
   * exists in the parent directory.
   */
  outputFileTracingRoot: new URL('.', import.meta.url).pathname,

  /**
   * Allow images from configured remote providers.
   *
   * Add specific remotePatterns here when production image
   * providers are finalized.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  /**
   * Do not expose Firebase secrets or Cashfree credentials.
   * Only NEXT_PUBLIC_* values intended for browser use should
   * be referenced by client-side code.
   */
  env: {
    NEXT_PUBLIC_DEMO_MODE:
      process.env.NEXT_PUBLIC_DEMO_MODE || 'true',
  },

  /**
   * Keep TypeScript checking enabled during production builds.
   */
  typescript: {
    ignoreBuildErrors: false,
  },

  /**
   * Keep ESLint/build issues visible rather than silently
   * ignoring them.
   */
  eslint: {
    ignoreDuringBuilds: false,
  },

  /**
   * Prevent accidental powered-by branding.
   */
  poweredByHeader: false,

  /**
   * Experimental features are intentionally kept empty.
   * Add an experimental option only when it is required
   * and verified against the installed Next.js version.
   */
  experimental: {},
};

export default nextConfig;