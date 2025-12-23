import { registerAs } from '@nestjs/config';

export default registerAs('cloudflare', () => ({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
  r2: {
    accessKey: process.env.CLOUDFLARE_R2_ACCESS_KEY || '',
    secretKey: process.env.CLOUDFLARE_R2_SECRET_KEY || '',
    bucket: process.env.CLOUDFLARE_R2_BUCKET || 'eman-portfolio-files',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || '',
  },
  images: {
    token: process.env.CLOUDFLARE_IMAGES_TOKEN || '',
    accountHash: process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH || '',
  },
}));

