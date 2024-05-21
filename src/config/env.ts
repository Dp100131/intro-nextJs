export const env = {
  SHOPIFY_HOST_NAME: process.env.SHOPIFY_HOST_NAME || '',
  SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN || '',
  SHOPIFY_GRAPHQL_ENDPOINT:
    (process.env.SHOPIFY_GRAPHQL_ENDPOINT as string) || '',
  SHOPIFY_STOREFRONT_TOKEN:
    (process.env.SHOPIFY_STOREFRONT_TOKEN as string) || '',
};
