import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl('./lib/i18n.ts');

export default withIntl({
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
});
