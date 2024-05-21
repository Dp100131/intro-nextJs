import { env } from '@/config/env';

export const shopifyUrls = {
  products: {
    all: `${env.SHOPIFY_HOST_NAME}/admin/api/2023-10/products.json`,
  },
  collections: {
    all: `${env.SHOPIFY_HOST_NAME}/admin/api/2023-10/smart_collections.json`,
    products: (id: string): string =>
      `${env.SHOPIFY_HOST_NAME}/admin/api/2023-10/collections/${id}/products.json`,
  },
};
