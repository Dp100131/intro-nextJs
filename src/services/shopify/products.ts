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
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
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
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
    quantity: product.quantity,
    handle: product.handle,
    tags: product.tags,
  };
};
