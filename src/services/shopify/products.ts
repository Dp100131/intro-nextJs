import { env } from '@/config/env';
import { shopifyUrls } from './urls';
import { ProductType } from '../../../types';

export const getProducts = async (): Promise<ProductType[]> => {
  const response = await fetch(shopifyUrls.products.all, {
    headers: new Headers({
      'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
    }),
  });

  const { products } = await response.json();

  return products.map((product: any) => ({
    id: product.id,
    gql_id: product.variants[0].admin_graphql_api_id,
    title: product.title,
    description: product.body_html,
    price: parseFloat(product.variants[0].price),
    image: product.image.src,
    quantity: product.quantity,
    handle: product.handle,
    tags: product.tags,
  }));
};

export const getProduct = async (id: string): Promise<ProductType> => {
  const response = await fetch(shopifyUrls.products.product(id), {
    headers: new Headers({
      'X-Shopify-Access-Token': env.SHOPIFY_TOKEN,
    }),
  });

  const { product } = await response.json();

  return {
    id: product.id,
    gql_id: product.variants[0].admin_graphql_api_id,
    title: product.title,
    description: product.body_html,
    price: parseFloat(product.variants[0].price),
    image: product.image.src,
    quantity: product.variants[0].inventory_quantity,
    handle: product.handle,
    tags: product.tags,
  };
};
